import { Reducer } from 'redux'

import BaseStateDefault from '../../constants/state'
import IAuthState from '../../interfaces/states/auth'
import actionTypes from '../../constants/action-types'
const initialState: IAuthState = {
  ...BaseStateDefault,
}

const reducer: Reducer<any> = (
  state: IAuthState = initialState,
  action: any
): IAuthState => {
  switch (action.type) {
    case actionTypes.Auth.GET_USER:
      return {
        ...state,
        data: action.payload
      }
    default: {
      return state
    }
  }
}

export default reducer
