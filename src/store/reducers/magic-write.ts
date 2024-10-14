import { Reducer } from 'redux'

import BaseStateDefault from '../../constants/state'
import IMagicWriteState from '../../interfaces/states/magic-write'
import actionTypes from '../../constants/action-types'
const initialState: IMagicWriteState = {
  ...BaseStateDefault,
}

const reducer: Reducer<any> = (
  state: IMagicWriteState = initialState,
  action: any
): IMagicWriteState => {
  switch (action.type) {
    case actionTypes.MAGIC_WRITE.FETCH_MAGIC_WRITE:
      return {
        ...state,
        requesting:true
      }
    case actionTypes.MAGIC_WRITE.ERROR_MAGIC_WRITE:
      return {
        ...state,
        error: action.payload,
        requesting:false
      }
    case actionTypes.MAGIC_WRITE.SUBMIT_MAGIC_WRITE:
      return {
        ...state,
        requesting: false,
        data: action.payload
      }
    default: {
      return state
    }
  }
}

export default reducer
