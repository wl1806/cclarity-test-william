import { message } from 'antd'
// import { ScreenMap } from 'antd/lib/_util/responsiveObserve'
import { RcFile } from 'antd/lib/upload'
import { useEffect } from 'react'

// import IMetadata, {
//   IMetadataDonationConfig,
//   IMetadataOverlayTheme
// } from '../interfaces/models/metadata'
// import IUserAuthProvider from '../interfaces/models/user-auth-provider'
// import { IUserDonationConfiguration } from '../interfaces/models/user-service'

// random number between min and max (inclusive)
const RandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const MaskingNumber = (value: string) => {
  return value.replace(/\b[\dX][-. \dX]+(\d{4})\b/g, (match, capture) => {
    return Array(match.length - 4).join('*') + capture
  })
}

// const GetMetadataValue = <T>(
//   type: string,
//   data: Array<IMetadata>,
//   parse = true
// ): T | undefined => {
//   let res: T | undefined
//   const meta = data.find((d) => d?.type === type)
//   if (meta) {
//     res = parse ? JSON.parse(meta.value) : meta
//   }

//   return res
// }

const GetBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

/**
 * example to use:
 * (file) => BeforeUpload(file, 2, ()=>setFiles({ ...files, [name]: file }))
 * maxSize (MB)
 */
const BeforeUpload = (
  file: RcFile | File,
  maxSize: number,
  onLoad: (isLessThan) => void,
  showMessage?: boolean
) => {
  const max = maxSize * 1024 * 1024
  const isLessThan = file.size < max
  if (!isLessThan && showMessage) {
    message.error(`File must smaller than ${maxSize}MB!`)
  }
  onLoad(isLessThan)
  return isLessThan
}

/**
 * https://github.com/vercel/next.js/issues/5354#issuecomment-520305040
 */
const CreateObjectUrl = (src: string | RcFile | File): string => {
  if (typeof src === 'string') return src
  return URL.createObjectURL(src)
}

// const GetUserAuthProvider = (
//   type: string | number,
//   data?: Array<IUserAuthProvider>
// ): IUserAuthProvider | undefined => {
//   return data?.find(
//     (x) =>
//       x.authProvider?.name.toLowerCase() === type.toString().toLowerCase() ||
//       x.authProvider?.id === type ||
//       x.authProviderId === type
//   )
// }

// const GenerateDefaultDonationConfiguration = (
//   themes?: IMetadataOverlayTheme,
//   config?: IMetadataDonationConfig
// ): IUserDonationConfiguration => {
//   if (!themes || !config) return {}
//   return {
//     welcomeMessage: 'Selamat datang di halaman saya!',
//     minimumAmount: config.minimum,
//     appreciationMessage: 'Terima kasih atas pemberiannya!',
//     theme: Object.keys(themes)[0],
//     tiers: [...Array(config.tier)].map((_, idx) => {
//       return {
//         id: idx + 1,
//         min: config.minimum + config.gap * idx
//       }
//     })
//   }
// }

const RemoveCharSpace = (value: string) => {
  return value.replace(/\s/g, '')
}

const ReplaceMatchingString = (str: string, data: any): string => {
  let newStr = str
  str.match(/{{.+?}}/g)?.forEach((lookup) => {
    const lookupCode = lookup.substring(2, lookup.length - 2).split('.')
    if (data) {
      let source = data[lookupCode[0]]
      for (let i = 1; i < lookupCode.length; i++) {
        source = lookupCode[i] && source ? source[lookupCode[i]] : ''
      }
      if (typeof source === 'string' || typeof source === 'number')
        newStr = newStr?.replace(lookup, '' + source)
    }
  })
  return newStr
}

export const Base64ToFile = async (dataUrl: string, fileName: string) => {
  const res: Response = await fetch(dataUrl)
  const blob: Blob = await res.blob()
  return new File([blob], fileName, { type: 'image/png' })
}

export const Sha256 = async (message) => {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message)

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => ('00' + b.toString(16)).slice(-2))
    .join('')
  return hashHex
}

export const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export const IsSafari = () => {
  return (
    (navigator.vendor &&
      navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('CriOS') == -1 &&
      navigator.userAgent.indexOf('FxiOS') == -1) ||
    false
  )
}

export const getLastIndexChar = (string) => {
  return string.slice(string.length - 1)
}

export const addStr = (str, index, stringToAdd) => {
  return (
    str.substring(0, index) + stringToAdd + str.substring(index, str.length)
  )
}

export const BlobToFile = (theBlob: Blob, fileName: string): File => {
  var b: any = theBlob
  b.lastModifiedDate = new Date()
  b.name = fileName

  return theBlob as File
}

export const IsNumeric = (s: string) => {
  const tester = /^[0-9]*$/
  if (!tester.test(s)) return false
  return true
}

// export const scrollToTarget = (target: string, mq: ScreenMap) => {
//   const element = document.getElementById(target)
//   const headerOffset = mq.md ? 96 : 64
//   const elementPosition =
//     (element?.getBoundingClientRect().top || 0) + window.scrollY
//   const offsetPosition = elementPosition - headerOffset

//   window.scrollTo({
//     top: offsetPosition,
//     behavior: 'smooth'
//   })
// }

export default {
  RandomInt,
  MaskingNumber,
  GetBase64,
  BeforeUpload,
  // GetMetadataValue,
  CreateObjectUrl,
  // GetUserAuthProvider,
  // GenerateDefaultDonationConfiguration,
  RemoveCharSpace,
  ReplaceMatchingString,
  Base64ToFile,
  Sha256,
  useOutsideClick,
  IsSafari,
  BlobToFile,
  getLastIndexChar,
  addStr
}
