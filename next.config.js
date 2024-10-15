/* eslint-disable */
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, "./src/styles/antd-custom.less"),
    "utf8"
  )
);

module.exports = {
  env: {
    APP_ENV: process.env.APP_ENV,
    XENDIT_PUBLISH_API_KEY: process.env.XENDIT_PUBLISH_API_KEY,
  },
  ...withCSS({
    cssModules: true,
    ...withSass({
      cssModules: true,
      ...withLess({
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables,
          importLoaders: 0,
        },
        cssLoaderOptions: {
          importLoaders: 3,
          localIdentName: "[local]",
        },
        // webpack: (config, { isServer }) => {
        //   if (isServer) {
        //     const antStyles = /antd\/.*?\/style.*?/
        //     const origExternals = [...config.externals]
        //     config.externals = [
        //       (context, request, callback) => {
        //         if (request.match(antStyles)) return callback()
        //         if (typeof origExternals[0] === 'function') {
        //           origExternals[0](context, request, callback)
        //         } else {
        //           callback()
        //         }
        //       },
        //       ...(typeof origExternals[0] === 'function' ? [] : origExternals)
        //     ]

        //     config.module.rules.unshift({
        //       test: antStyles,
        //       use: 'null-loader'
        //     })
        //   } else {
        //     config.resolve.alias['@sentry/node'] = '@sentry/browser'
        //   }
        //   return config
        // }
      }),
    }),
  }),
};
