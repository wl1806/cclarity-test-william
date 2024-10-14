import { IResponse } from '../interfaces/api'
import { IRequestHandler } from '../interfaces/api/request'

const Handler = (api: Promise<IResponse<any>>, r: IRequestHandler) => {
  if (r.onRequested) r.onRequested()
  return api
    .then((response) => {
      if (response.data?.success) {
        if (r.onSuccess) r.onSuccess(response.data)
      } else {
        throw new Error(response.data?.errors?.map((x) => x.message).join(','))
      }
      return response
    })
    .catch((error: any) => {
      const err =
        error.response?.data?.errors?.map((x) => x.message).join(',') ||
        error.message ||
        error
      if (r.onFailed) r.onFailed(err)
      return error
    })
}

export default Handler
