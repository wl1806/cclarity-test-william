// import Router from 'next/router'
import { AnyAction, Dispatch } from 'redux'
import { action } from 'typesafe-actions'

import { message } from 'antd'
import ActionTypes from '../../constants/action-types'


const GetSuggestion = (text: string, ctx?: any) => (dispatch: Dispatch<AnyAction>) => {
  // hit api then return
  dispatch(
    action(ActionTypes.MAGIC_WRITE.FETCH_MAGIC_WRITE)
  )

  const error = false
  if(error){
    setTimeout(()=>{
      dispatch(
        action(ActionTypes.MAGIC_WRITE.ERROR_MAGIC_WRITE, 'Failed to fetch data')
      )
      message.error('Failed to fetch data')
    },1000)
  }else{
    setTimeout(()=>{
      dispatch(
        action(ActionTypes.MAGIC_WRITE.SUBMIT_MAGIC_WRITE, {
          suggestion: text+' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        })
      )
    },1000)

  }


  
}

export default {
  GetSuggestion
}
