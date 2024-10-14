import { Col, Row } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
// import dynamic from 'next/dynamic'
// import Router, { useRouter } from 'next/router'
import React from 'react'
import { connect } from 'react-redux'

// const NextLink = dynamic(() => import('next/link'), { ssr: false })
import Layout from '../src/components/layout'
import actions from '../src/store/actions'
import { ReduxState } from '../src/store/reducers'
import magicWrite from '../src/store/actions/magic-write'
import IAuthState from '../src/interfaces/states/auth'
import IMagicWriteState from '../src/interfaces/states/magic-write'
// import { eventTrack } from '../src/utils/gtm'


interface IProps {
  auth: IAuthState
  magicWrite: IMagicWriteState
}

const Landing = (props: IProps) => {
  const {auth, magicWrite} = props
  const mq = useBreakpoint()
  
  return (
    <Layout
      className='p-0'
    >
      <Row justify='center' className={mq.md ? 'mt-12' : 'mt-2'}>
        <Col xs={24} md={18}>
          Content
        </Col>
      </Row>
    </Layout>
  )
}

Landing.getInitialProps = async (ctx: any) => {
  await ctx.store.dispatch(
    actions.Auth.GetUser(ctx)
  ) 
}

const mapStateToProps = (state: ReduxState) => ({
  magicWrite: state.magicWrite
})


const mapDispatchToProps = (dispatch: any) => ({
  // Login: (data: ILogin, referrer?: string) =>
  //   dispatch(actions.Auth.Login(data, referrer))
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
