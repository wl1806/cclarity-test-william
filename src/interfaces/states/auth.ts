import IUser from '../models/user'
import IBaseState from './base'

interface IAUthState extends IBaseState<IUser> {
  validated?: boolean
  socketStatus?: string

  email?: string

  //fe only
  isVisibleSnackbarOnboarding?: boolean
}
export default IAUthState
