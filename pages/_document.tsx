import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

import ENV from '../src/utils/environment'

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <Html>
        <Head>
          {ENV.NO_INDEX ? <meta name='googlebot' content='noindex' /> : <></>}
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&display=swap'
            rel='stylesheet'
          />

          {ENV.GTM_ENABLE ? (
            <>
              {/* Google Tag Manager */}
              <script
                async
                dangerouslySetInnerHTML={{
                  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer', '${ENV.GTM_CONTAINER_ID}');`
                }}
              />
              {/* End Google Tag Manager */}
            </>
          ) : (
            <></>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
