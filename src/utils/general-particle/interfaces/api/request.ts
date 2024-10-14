import IResult from './result'

export interface IRequestFetch {
  baseUrl: string
  token?: string
  service?: string
}

export interface IRequestHandler {
  onRequested?: () => void
  onSuccess?: (data: IResult<any>) => void
  onFailed?: (message: string) => void
}

export interface IRequest extends IRequestFetch, IRequestHandler {}
