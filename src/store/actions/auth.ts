// import Router from 'next/router'
import { AnyAction, Dispatch } from 'redux'
import { action } from 'typesafe-actions'

import ActionTypes from '../../constants/action-types'
import STORAGE from '../../constants/storage'
import ENV from '../../utils/environment'
import Storage from '../../utils/general-particle/utils/storage'

// const HandleSuccessAuthorization = (
//   token: string,
//   ctx?: any,
//   urlRedirect?: string
// ) => {
//   Router.push(urlRedirect || '/home')
// }

const Logout = (ctx?: any) => (dispatch: Dispatch<AnyAction>) => {
  dispatch(action(ActionTypes.Auth.LOGOUT))
  Storage.Remove(
    STORAGE.TOKEN + ENV.STORAGE_SUFFIX,
    ENV.STORAGE_DOMAIN,
    ctx?.res
  )
  Storage.Remove(
    STORAGE.DUMMY_USER + ENV.STORAGE_SUFFIX,
    ENV.STORAGE_DOMAIN,
    ctx?.res
  )
  if (ctx?.isServer) {
    ctx.res.writeHead(307, { Location: `/` })
    ctx.res.end()
  } else {
    window.location.href = '/'
  }
}

export default {
  Logout
}
