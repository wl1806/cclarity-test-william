import { combineReducers } from 'redux'

import IAuthState from '../../interfaces/states/auth'
import auth from './auth'
import magicWrite from './magic-write'
import IMagicWrite from '../../interfaces/states/magic-write'

export interface ReduxState {
  auth: IAuthState
  magicWrite: IMagicWrite
}

export const rootReducer = combineReducers<ReduxState>({
  magicWrite,
  auth
})
