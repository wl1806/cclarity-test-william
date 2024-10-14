import { IPaging } from '../../utils/general-particle/dist/interfaces/api'

interface IPage extends IPaging {
  cursor?: number
}

interface IBaseState<T> {
  data?: T | undefined
  list?: Array<T>
  requesting: boolean
  paging?: IPage
  error?: string
  code?: Array<number>
}

export default IBaseState
