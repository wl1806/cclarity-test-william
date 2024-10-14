// import axios from 'axios'
// import axiosRetry from 'axios-retry'

import IConfig from '../interfaces/api/config'

const API = (config: IConfig) => {
  // const instance = axios.create({
  //   baseURL: config.baseURL,
  //   timeout: config.timeout || 15000,
  //   headers: {
  //     'content-type': 'application/json'
  //   }
  // })

  // instance.interceptors.request.use(async (c) => {
  //   if (config.customHeader) {
  //     for (var pair of config.customHeader.entries()) {
  //       c.headers[pair[0]] = pair[1]
  //     }
  //   }
  //   return c
  // })

  // instance.interceptors.response.use(
  //   (response) => {
  //     return response
  //   },
  //   (error) => {
  //     return Promise.reject(error)
  //   }
  // )

  // axiosRetry(instance, {
  //   retries: config.retryAttemp || 3,
  //   retryDelay: () => config.retyrInterval || 500,
  //   shouldResetTimeout: true
  // })

  // return instance
}

export default API
