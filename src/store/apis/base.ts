import ENV from '../../utils/environment'
import API from '../../utils/general-particle/api'
import { IRequestFetch } from '../../utils/general-particle/dist/interfaces/api/request'
import Utils from '../../utils/general-particle/utils'

const Base = (service: string, ctx?: any) => {
  const r: IRequestFetch = {
    baseUrl: ENV.API_URL,
    service
  }
  return API.Fetch(r)
}

export default Base
