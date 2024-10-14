import { combineReducers } from 'redux'

import IAuthState from '../../interfaces/states/auth'
import auth from './auth'

export interface ReduxState {
  auth: IAuthState
}

export const rootReducer = combineReducers<ReduxState>({
  auth
})
