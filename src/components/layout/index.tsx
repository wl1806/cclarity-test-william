import { Avatar, Button, Col, Image, Layout, Row, Typography } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import './style.css'
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
import Text from 'antd/lib/typography/Text'

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
  auth: IAUthState
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
      className
    } = this.props
    return (
      <Layout className={className}>
        <SEO />
        <Header className='header'>
          <Row align='middle' justify='space-between' wrap={false} style={{ height: '100%' }}>
            <Col>
            <Row className=''>
              <Col>
                <Image 
                wrapperClassName='logo-wrapper'
                className='logo-inner'
                  src='/images/logo.png'
                  preview={false}
                />
              </Col>
              <Col>
                <Text className='trial-text ph-1'>
                  TRIAL                  
                </Text>
              </Col>
            </Row>
            </Col>
            <Col>
              <Avatar
                size={40}
                src={this.props.auth.data?.image}
              />
            </Col>
          </Row>
        </Header>
        <Layout>
      
          {children}
      </Layout>
      </Layout>
    )
  }
}

LayoutComponent.defaultProps = {
  children: undefined,
  auth: {} as IAUthState,
  router: {} as NextRouter
}

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch: any) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LayoutComponent))
