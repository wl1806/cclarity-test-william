import Cookies from 'js-cookie'

const Set = (key: string, value: any, domain?: string, res?: any) => {
  if (res) SetFromServer(key, value, res)
  else if (!res && domain) SetFromClient(key, value, domain)
}

const SetFromClient = (key: string, value: any, domain: string) => {
  Cookies.set(`__${key}__`, JSON.stringify(value), { domain })
}

const SetFromServer = (key: string, value: any, res: any) => {
  if (res.cookie) {
    res.cookie(`__${key}__`, value, {
      maxAge: 60 * 24 * 60 * 60 * 1000
    })
  }
}

const Get = (key: string, req?: any) => {
  return req ? GetFromServer(key, req) : GetFromClient(key)
}

const GetFromClient = (key: string) => {
  const value = Cookies.get(`__${key}__`)
  return value ? JSON.parse(value) : undefined
}

const GetFromServer = (key: string, req: any) => {
  if (!req.headers || !req.headers.cookie) {
    return undefined
  }
  const rawCookie = req.headers?.cookie
    ?.split(';')
    .find((c: string) => c.trim().startsWith(`__${key}__=`))
  if (!rawCookie) {
    return undefined
  }
  return JSON.parse(decodeURIComponent(rawCookie.split('=')[1]))
}

const Remove = (key: string, domain?: string, res?: any) => {
  if (res) RemoveFromServer(key, res)
  else if (!res && domain) RemoveFromClient(key, domain)
}

const RemoveFromClient = (key: string, domain: string) => {
  Cookies.remove(`__${key}__`, { domain })
}

const RemoveFromServer = (key: string, res: any) => {
  if (res.cookie) {
    res.cookie(`__${key}__`, '', {
      maxAge: 0
    })
  }
}

export default {
  Set,
  Get,
  Remove
}
