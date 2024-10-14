export const GTMPageView = (url: string) => {
  interface PageEventProps {
    event: string
    page: string
  }

  const pageEvent: PageEventProps = {
    event: 'pageview',
    page: url
  }
  //@ts-ignore
  window && window.dataLayer && window.dataLayer.push(pageEvent)
  return pageEvent
}

export const eventTrack = (value: string, isEvent = true) => {
  // @ts-ignore
  if (typeof window === 'object') {
    // @ts-ignore
    window.dataLayer = window.dataLayer || []
    // @ts-ignore
    window?.dataLayer.push(
      isEvent
        ? {
            event: value
          }
        : {
            userId: value
          }
    )
  }
}
