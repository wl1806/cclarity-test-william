import { IRequestFetch } from '../interfaces/api/request'
import Utils from '../utils'

const Fetch = (r: IRequestFetch) => {
  const customHeader = new Headers()
  if (r.token) {
    customHeader.append('authorization', `Bearer ${r.token}`)
  }
  return Utils.API({
    baseURL: r.baseUrl + r.service,
    customHeader
  })
}

export default Fetch
