package libkb

import (
	"fmt"
)

type KeyUnlocker struct {
	Tries    int
	Reason   string
	KeyDesc  string
	Prompt   string
	Unlocker func(pw string) (ret *PgpKeyBundle, err error)
}

func (arg KeyUnlocker) Run() (ret *PgpKeyBundle, err error) {

	var emsg string

	desc := "You need a passphrase to unlock the secret key for:\n" +
		arg.KeyDesc + "\n"
	if len(arg.Reason) > 0 {
		desc = desc + "\nReason: " + arg.Reason
	}

	prompt := arg.Prompt
	if len(prompt) == 0 {
		prompt = "Your key passphrase"
	}

	for i := 0; (arg.Tries <= 0 || i < arg.Tries) && ret == nil && err == nil; i++ {
		var res *SecretEntryRes
		res, err = G.SecretEntry.Get(SecretEntryArg{
			Error:  emsg,
			Desc:   desc,
			Prompt: prompt,
		}, nil)

		if err == nil && res.Canceled {
			err = fmt.Errorf("Attempt to unlock secret key entry canceled")
		} else if err != nil {
			// noop
		} else if ret, err = arg.Unlocker(res.Text); err == nil {
			// noop
		} else if _, ok := err.(PassphraseError); ok {
			emsg = "Failed to unlock key; bad passphrase"
			err = nil
		}
	}

	if ret == nil && err == nil {
		err = fmt.Errorf("Too many failures; giving up")
	}
	if err != nil {
		ret = nil
	}
	return
}
