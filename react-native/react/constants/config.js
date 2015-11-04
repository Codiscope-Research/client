'use strict'
/* @flow */

export type NavState = 'navStartingUp' | 'navNeedsRegistration' | 'navNeedsLogin' | 'navLoggedIn' | 'navErrorStartingUp'

// Constants
export const navStartingUp = 'navStartingUp'
export const navNeedsRegistration = 'navNeedsRegistration'
export const navNeedsLogin = 'navNeedsLogin'
export const navLoggedIn = 'navLoggedIn'
export const navErrorStartingUp = 'navErrorStartingUp'

// Actions
export const startupLoading = 'startupLoading'
export const startupLoaded = 'startupLoaded'

export const devConfigLoading = 'devConfigLoadin'
export const devConfigLoaded = 'devConfigLoaded'
export const devConfigUpdate = 'devConfigUpdate'
export const devConfigSaved = 'devConfigSaved'

export const pushPermissionStatus = {
  loading: 'loading',
  never_prompted: 'never_prompted',
  continued: 'continued',
  declined: 'declined',
  deferred: 'deferred'
}
