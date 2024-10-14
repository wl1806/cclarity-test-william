import { Reducer } from 'redux'

import BaseStateDefault from '../../constants/state'
import IAuthState from '../../interfaces/states/auth'
const initialState: IAuthState = {
  ...BaseStateDefault,
  validated: false,
  email: undefined
}

const reducer: Reducer<any> = (
  state: IAuthState = initialState,
  action: any
): IAuthState => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export default reducer
