const env = process.env.APP_ENV || 'local'

const CONFIGS = {
  DEV: {
    API_URL: 'http://localhost:5100',
    GTM_ENABLE: false,
    STORAGE_SUFFIX: '_dev',
    STORAGE_DOMAIN: '.dev.fe-template.com',
    GTM_CONTAINER_ID: '',
    USE_METRIC: false,
    NO_INDEX: true,
    IS_DEBUG: true
  },
  PROD: {
    API_URL: 'http://localhost:5100',
    GTM_ENABLE: false,
    STORAGE_SUFFIX: '_dev',
    STORAGE_DOMAIN: '.dev.fe-template.com',
    GTM_CONTAINER_ID: '',
    USE_METRIC: false,
    NO_INDEX: false,
    IS_DEBUG: true
  }
}

let CONFIG = CONFIGS.DEV
if (env === 'production') {
  CONFIG = CONFIGS.PROD
}

export default CONFIG
