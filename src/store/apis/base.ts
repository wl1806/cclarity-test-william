import STORAGE from '../../constants/storage'
import ENV from '../../utils/environment'
import API from '../../utils/general-particle/api'
import { IRequestFetch } from '../../utils/general-particle/dist/interfaces/api/request'
import Utils from '../../utils/general-particle/utils'

const Base = (service: string, ctx?: any) => {
  const token = Utils.Storage.Get(STORAGE.TOKEN + ENV.STORAGE_SUFFIX, ctx?.req)
  const r: IRequestFetch = {
    baseUrl: ENV.API_URL,
    token,
    service
  }
  return API.Fetch(r)
}

export default Base
