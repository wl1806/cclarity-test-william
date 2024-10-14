// import Router from 'next/router'
import { AnyAction, Dispatch } from 'redux'
import { action } from 'typesafe-actions'

import ActionTypes from '../../constants/action-types'


const GetUser = (ctx?: any) => (dispatch: Dispatch<AnyAction>) => {
  // hit api then return
  dispatch(
    action(ActionTypes.Auth.GET_USER, {
      name: 'William'   ,
      image: 'https://iili.io/2HyddE7.jpg'
    })
  )
  
}

export default {
  GetUser
}
