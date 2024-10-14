export default interface IConfig {
  baseURL: string
  timeout?: number
  retryAttemp?: number
  retyrInterval?: number
  customHeader?: Headers
}
