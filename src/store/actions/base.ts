import { message } from 'antd'

import API from '../../utils/general-particle/api'
import {
  IResponse,
  IResult
} from '../../utils/general-particle/dist/interfaces/api'
import { IRequestHandler } from '../../utils/general-particle/dist/interfaces/api/request'

const CallAction = (
  api: Promise<IResponse<any>>,
  onRequested?: () => any,
  onSuccess?: (data: IResult<any>) => any,
  onFailed?: (
    message: string,
    code?: Array<number>,
    status?: Array<number>
  ) => any,
  ctx?: any,
  notify = true
) => {
  const r: IRequestHandler = {
    onRequested,
    onSuccess,
    onFailed: (msg) => {
      if (!ctx && notify) message.error(msg)
      if (onFailed) onFailed(msg)
    }
  }
  return API.Handler(api, r)
}

export default {
  CallAction
}
