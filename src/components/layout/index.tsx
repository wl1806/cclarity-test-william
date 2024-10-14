import { Button, Col, Image, Layout, Row, Typography } from 'antd'
import { Header } from 'antd/lib/layout/layout'
// import _ from 'lodash'
import { WithRouterProps } from 'next/dist/client/with-router'
import NextLink from 'next/link'
import { NextRouter, withRouter } from 'next/router'
import React from 'react'
import { connect } from 'react-redux'

import IAUthState from '../../interfaces/states/auth'
import Actions from '../../store/actions'
import { ReduxState } from '../../store/reducers'
// import Format from '../../utils/format'
import SEO from '../seo'
import { ISEO } from '../seo'

const footerLinks = [
  {
    id: 'ig',
    url: 'https://www.instagram.com/fe-template',
    img: 'https://www.instagram.com/fe-template.png'
  }
]
interface IProps extends WithRouterProps {
  children: React.ReactNode
  className?: string
  headerStyle?: any
  seo?: ISEO
  breadcrumb?: Array<{ label: string; url?: string }>
  header?: {
    left?: React.ReactNode
    middle?: React.ReactNode
    right?: React.ReactNode
  }
  customHeader?: React.ReactNode
  customFooter?: React.ReactNode
  Logout: () => void
  style?: any
  footer?: boolean | React.ReactNode
  auth: IAUthState
  preloadImages?: Array<string>
}

class LayoutComponent extends React.Component<IProps> {
  static defaultProps: IProps

  constructor(props: IProps) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      children,
      className,
      headerStyle,
      seo,
      // breadcrumb,
      header,
      customHeader,
      customFooter,
      // Logout,
      style,
      footer,
      // auth,
      preloadImages
    } = this.props
    const newSeo = {
      ...seo
    }
    return (
      <Layout style={style} className={className}>
        <SEO {...newSeo} />
        {preloadImages ? (
          preloadImages.map((pre) => (
            <link key={pre} rel='preload' as='image' href={pre} />
          ))
        ) : (
          <></>
        )}
        {header ? (
          <Header style={headerStyle}>
            <Row align='middle' wrap={false} style={{ height: '100%' }}>
              <Col>{header.left}</Col>
              <Col flex='auto'>
                {header.middle || (
                  <Row justify='center' align='middle'>
                    {/* <Logo target='header' /> */}
                  </Row>
                )}
              </Col>
              <Col>{header.right}</Col>
            </Row>
          </Header>
        ) : (
          <></>
        )}
        {customHeader || <></>}

        <Layout>
          {children}
          {footer ? (
            typeof footer === 'boolean' ? (
              <Row
                justify='center'
                className='bg-white layout-footer-container pv-5 bg-divider'
              >
                <Col xs={24} md={7}>
                  <Row style={{ marginBottom: '10px', placeContent: 'center' }}>
                    <Image src={''} preview={false} />
                    logo
                  </Row>
                  <Row style={{ marginBottom: '10px', placeContent: 'center' }}>
                    <Typography.Text
                      className='text-size-14 text-height-24'
                      style={{ opacity: '50%' }}
                    >
                      Copyright 2022 @ fe-template. All rights reserved.
                    </Typography.Text>
                  </Row>
                </Col>
                <Col xs={24} md={7}>
                  <div style={{ display: 'flex', placeContent: 'center' }}>
                    {footerLinks.map((link) => {
                      return (
                        <NextLink href={`${link.url}`} key={link.id} passHref>
                          <a style={{ padding: '15px' }}>
                            <Image src={link.img} preview={false} />
                          </a>
                        </NextLink>
                      )
                    })}
                  </div>
                </Col>
                <Col xs={24} md={7} style={{ textAlign: 'center' }}>
                  <NextLink href='/policy' passHref>
                    <Button type='link' color={'#222'}>
                      <div style={{ color: 'black', opacity: '50%' }}>
                        privacy policy
                      </div>
                    </Button>
                  </NextLink>
                  <NextLink href='/tos' passHref>
                    <Button type='link' color={'#222'}>
                      <div style={{ color: 'black', opacity: '50%' }}>tnd</div>
                    </Button>
                  </NextLink>
                </Col>
              </Row>
            ) : (
              footer
            )
          ) : (
            <></>
          )}
          {customFooter || <></>}
        </Layout>
      </Layout>
    )
  }
}

LayoutComponent.defaultProps = {
  children: undefined,
  auth: {} as IAUthState,
  Logout: () => undefined,
  router: {} as NextRouter
}

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch: any) => ({
  Logout: () => dispatch(Actions.Auth.Logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LayoutComponent))
