// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Render from './render'
import logSend from '../../native/log-send'

type State = {
  logSendId: ?string
}

class LogSend extends Component<void, {}, State> {
  state: State;

  constructor (props: {}) {
    super(props)
    this.state = {
      logSendId: null
    }
  }

  render () {
    const onLogSend = () => {
      logSend().then(logSendId => this.setState({logSendId}))
    }

    return <Render logSendId={this.state.logSendId} onLogSend={onLogSend} />
  }

  static parseRoute () {
    return {componentAtTop: {title: 'Log Send'}}
  }
}

export default connect()(LogSend)