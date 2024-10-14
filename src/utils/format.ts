import DOMPurify from 'dompurify'
import moment from 'moment'

const GetTimeDifference = (refTime: number): string => {
  const currentTime = moment().unix()
  const minute = 60
  const hour = 3600
  const day = 86400
  const diff = refTime - currentTime
  const absDiff = Math.abs(diff) || 1
  if (
    absDiff / day > 7 &&
    moment.unix(refTime).format('YYYY') !==
      moment.unix(currentTime).format('YYYY')
  ) {
    return moment.unix(refTime).format("DD MMM 'YY")
  } else if (absDiff / day > 7) {
    return moment.unix(refTime).format('DD MMM')
  } else if (absDiff / day > 1) {
    return `${Math.ceil(absDiff / day)} hari lagi`
  } else if (absDiff / hour > 1) {
    return `${Math.ceil(absDiff / hour)} jam lagi`
  } else if (absDiff > 60) {
    return `${Math.ceil(absDiff / minute)} menit lagi`
  } else {
    return `${absDiff} detik lagi`
  }
}

const GetRemainingDays = (
  time: number,
  max: number,
  language: string,
  asNumber?: boolean
): any => {
  const hour = 3600
  const day = 86400
  const maxDays = max * day
  if (time < maxDays && time > day) {
    return asNumber
      ? Math.ceil(time / day)
      : `${Math.ceil(time / day)} hari lagi`
  }
  if (time < day && time > 0)
    return asNumber
      ? Math.ceil(time / hour)
      : `${Math.ceil(time / hour)} jam lagi`
  return ''
}

const IsTimeLessThanADay = (time: number): any => {
  const day = 86400
  if (time < day && time > 0) return true
  return false
}

const NumberUnit = (n: number): string => {
  const lookup = [
    { min: 1000000000000, label: { en: 'T', id: 'T' } },
    { min: 1000000000, label: { en: 'B', id: 'M' } },
    { min: 1000000, label: { en: 'M', id: 'Jt' } },
    { min: 1000, label: { en: 'K', id: 'Rb' } }
  ]

  let i = 0
  while (i < lookup.length) {
    if (n >= lookup[i].min) {
      const val = Math.round((n / lookup[i].min) * 10) / 10
      return val + ''
    }
    i++
  }
  return n.toString()
}

const GetDate = (time: number): string => {
  return moment.unix(time).format('D MMM')
}

const Romanize = (num: number) => {
  var lookup = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    },
    roman = '',
    i
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i
      num -= lookup[i]
    }
  }
  return roman
}

const Sanitize = (str: string, html: boolean = true) => {
  return (
    (DOMPurify.sanitize &&
      DOMPurify.sanitize(str, { USE_PROFILES: { html } })) ||
    ''
  )
}
const DurationToTime = (dur) => {
  const date = new Date(0)
  date.setSeconds(dur)
  const timeString =
    date.getUTCHours() > 0
      ? date.toISOString().substr(11, 8)
      : date.toISOString().substr(14, 5)
  return timeString
}

export const DateToString = (d: number, format: string) => {
  return moment.unix(d).format(format)
}

const GroupDate = (startDate, endDate) => {
  if (
    DateToString(startDate, 'DD MMM yyyy') ===
    DateToString(endDate, 'DD MMM yyyy')
  )
    return DateToString(startDate, 'DD MMM yyyy')
  return `${DateToString(startDate, 'DD MMM')} - ${DateToString(
    endDate,
    'DD MMM yyyy'
  )}`
}

const TransformArrayToUrlPath = (pathArray) => {
  let newPathname = ''
  let i
  for (i = 0; i < pathArray.length; i++) {
    newPathname += '/'
    newPathname += pathArray[i]
  }
  return newPathname
}

const GetExpiredInText = (expiredIn: number): string => {
  const secondInADay = 86400
  const secondInAMonth = secondInADay * 30

  // 15:10:10
  if (expiredIn < secondInADay) {
    return moment.utc(expiredIn * 1000).format('HH:mm:ss')
  }
  // # hari lagi berakhir
  if (expiredIn < secondInAMonth) {
    const dayToExpired = Math.floor(expiredIn / secondInADay)
    return 'Sisa ' + dayToExpired + ' hari'
  }
  return ''
}

export default {
  NumberUnit,
  GetDate,
  Romanize,
  GetRemainingDays,
  IsTimeLessThanADay,
  GetTimeDifference,
  Sanitize,
  DurationToTime,
  DateToString,
  GroupDate,
  TransformArrayToUrlPath,
  GetExpiredInText
}
