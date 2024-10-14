const Email = (email: string) => {
  // const tester =
  //   /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
  if (!email) {
    return false
  }

  if (email.length > 256) {
    return false
  }

  // Further checking of some things regex can't handle
  const [account, address] = email.split('@')
  if (account.length > 64) {
    return false
  }

  const domainParts = address.split('.')
  if (domainParts.some((part) => part.length > 63)) {
    return false
  }

  return true
}

const PhoneNumber = (text?: string) => {
  const tester = /^(((0))((?!0))[0-9]{7,14})$/
  if (!text) return false
  if (!tester.test(text)) return false
  return true
}

export default {
  Email,
  PhoneNumber
}
