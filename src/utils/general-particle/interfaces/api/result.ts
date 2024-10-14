import IError from './error'
import IPaging from './paging'

export default interface IResult<T> {
  success: boolean
  errors?: Array<IError>
  data?: T
  paging?: IPaging
}
