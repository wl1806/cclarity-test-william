const Encrypt = (salt: string, text: string) => {
  try {
    return btoa(salt + text)
  } catch (err) {
    return Buffer.from(salt + text).toString('base64')
  }
}

const Decrypt = (salt: string, encoded: string) => {
  try {
    return atob(salt + encoded)
  } catch (err) {
    return Buffer.from(salt + encoded, 'base64').toString()
  }
}

export default {
  Encrypt,
  Decrypt
}
