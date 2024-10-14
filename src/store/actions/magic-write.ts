// import Router from 'next/router'
import { AnyAction, Dispatch } from 'redux'
import { action } from 'typesafe-actions'

import ActionTypes from '../../constants/action-types'
import ENV from '../../utils/environment'
import Storage from '../../utils/general-particle/utils/storage'


const GetSuggestion = (text: string, ctx?: any) => (dispatch: Dispatch<AnyAction>) => {
  // hit api then return
  dispatch(
    action(ActionTypes.MAGIC_WRITE.FETCH_MAGIC_WRITE)
  )

  setTimeout(()=>{

    dispatch(
      action(ActionTypes.MAGIC_WRITE.SUBMIT_MAGIC_WRITE, {
        suggestion: text+' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
      })
    )
  },1000)

  
}

export default {
  GetSuggestion
}
