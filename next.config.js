const withAntdLess = require('next-plugin-antd-less');
const withLess = require("next-with-less");

module.exports = withLess({
  images: {
    domains: [
      'res.cloudinary.com'
    ]
  },
  lessLoaderOptions: {
    /* ... */
  },
});