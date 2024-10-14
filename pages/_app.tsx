import 'react-toastify/dist/ReactToastify.css'
// import { ReduxState } from '../src/store/reducers'
import '../src/styles/main.less'

import moment from 'moment'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { Provider } from 'react-redux'

import { initStore } from '../src/store'
import ENV from '../src/utils/environment'

moment.locale('en')

interface IProps {
  store
}

class MyApp extends App<IProps> {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    }
  }

  // componentDidMount = () => {
  //   const { store, pageProps, router } = this.props
  //   const state: ReduxState = store.getState()
  // }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export function reportWebVitals(metric) {
  ENV.USE_METRIC && console.log('Metric: ', metric)
}

export default withRedux(initStore, { debug: ENV.IS_DEBUG })(MyApp)
