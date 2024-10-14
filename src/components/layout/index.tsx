import { Avatar, Button, Col, Image, Layout, Row, Typography } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import './style.css'
import { WithRouterProps } from 'next/dist/client/with-router'
import { NextRouter, withRouter } from 'next/router'
import React from 'react'
import { connect } from 'react-redux'

import IAUthState from '../../interfaces/states/auth'
import { ReduxState } from '../../store/reducers'
import SEO from '../seo'
import Text from 'antd/lib/typography/Text'
import Sider from 'antd/lib/layout/Sider'

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

interface SIDE_MENU {
  text: string
  path: string
  image: string
  isActive?: boolean
}

const sideMenu: SIDE_MENU[] = [
{
  image:'/images/btn_magic.png',
  path:'/#',
  text:'Magic Write'
},
{
  image:'/images/btn_post.png',
  path:'/#',
  text:'Post'
},
{
  image:'/images/btn_analytic.png',
  path:'/#',
  text:'Analysis'
},
{
  image:'/images/btn_ideas.png',
  path:'/#',
  text:'Ideas'
},
{
  image:'/images/btn_templates.png',
  path:'/#',
  text:'Templates'
},
{
  image:'/images/btn_scratch.png',
  path:'/#',
  text:'Scratch'
}
]


const sideMenuBot: SIDE_MENU[] = [
  {
    image:'/images/btn_billing.png',
    path:'/#',
    text:'Billing'
  },
  {
    image:'/images/btn_ideas.png',
    path:'/#',
    text:'Payment'
  },
  {
    image:'/images/btn_help.png',
    path:'/#',
    text:'Help'
  },
  {
    image:'/images/btn_time.png',
    path:'/#',
    text:'3d left'
  }
]

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
          <Sider>
            {sideMenu.map(e=>{
              return 
            })}
            
          </Sider>
          <Content>
            
                {children}
          </Content>

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
