const Numberize = (
  input: number,
  separator?: string,
  prefix?: string,
  suffix?: string
) =>
  `${prefix || ''} ${input
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator || '.')}${suffix || ''}`

const Capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const Slug = (text: string) =>
  text
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .join('-')
    .toLowerCase()

const ConvertCardNumber = (text: string) => {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    const n = text.charCodeAt(i) - 38
    result = result.concat(n.toString())
  }

  let convertedNumber = result.substr(0, 4)
  for (let i = 1; i < 4; i++) {
    convertedNumber = convertedNumber + ' ' + result.substr(i * 4, 4)
  }
  return convertedNumber
}

export default {
  Numberize,
  Capitalize,
  Slug,
  ConvertCardNumber
}
