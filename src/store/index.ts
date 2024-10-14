import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import ENV from '../utils/environment'
import { rootReducer } from './reducers'

const middlewares: Array<any> = []
middlewares.push(thunkMiddleware)
if (ENV.IS_DEBUG) middlewares.push(createLogger())

export const initStore = (initial = {}) => {
  return createStore(rootReducer, initial, applyMiddleware(...middlewares))
}
