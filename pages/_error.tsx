/* eslint-disable react/prop-types */

import Error from 'next/error'
// import * as Sentry from '@sentry/node'
// import Error, { ErrorProps } from 'next/error'
import React from 'react'

const MyError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    // Sentry.captureException(err)
  }

  return <Error statusCode={statusCode} />
}

MyError.getInitialProps = async ({
  res,
  err,
  // asPath,
  pathname,
  query,
  AppTree
}) => {
  const errorInitialProps = await Error.getInitialProps({
    res,
    err,
    pathname,
    query,
    AppTree
  })

  if (res) {
    if (res.statusCode === 404) {
      return { statusCode: 404 }
    }

    if (err) {
      // Sentry.captureException(err)

      return errorInitialProps
    }
  } else {
    if (err) {
      // Sentry.captureException(err)

      return errorInitialProps
    }
  }
  // Sentry.captureException(
  //   new Error(
  //     `_error.js getInitialProps missing data at path: ${asPath}` as unknown as ErrorProps
  //   )
  // )

  return errorInitialProps
}

export default MyError
