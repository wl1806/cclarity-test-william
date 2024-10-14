import Head from 'next/head'
import React from 'react'

export interface ISEO {
  title?: string
  description?: string
  keywords?: string
  image?: string
  author?: string
  language?: string
  data?: any
}

class SEO extends React.Component<ISEO> {
  static defaultProps: ISEO
  render() {
    const { keywords, author, image } = this.props
    let { title, description } = this.props
    title = title || 'fe-template'
    description = description || ''
    return (
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <title>{`${title} | fe-template`}</title>
        <link
          rel='icon'
          href='/images/logo.ico'
          sizes='any'
          type='image/ico+xml'
        />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content={author} />

        <meta property='og:locale' content='id' />
        <meta property='og:site_name' content={title} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:creator' content={author} />
        <meta name='twitter:image' content={image}></meta>
      </Head>
    )
  }
}

SEO.defaultProps = {
  title: 'CCLarity - William FE',
  description: '',
  keywords: 'fe-template',
  image: '/images/logo.png',
  author: 'fe-template'
}

export default SEO
