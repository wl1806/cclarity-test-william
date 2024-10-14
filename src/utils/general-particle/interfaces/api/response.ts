import IResult from './result'

export default interface IResponse<T> {
  data?: IResult<T>
  status: number
  statusText: string
  headers: any
  config: any
  request: any
}
