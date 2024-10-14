import { Col, Row } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
// import dynamic from 'next/dynamic'
// import Router, { useRouter } from 'next/router'
import React from 'react'
import { connect } from 'react-redux'

// const NextLink = dynamic(() => import('next/link'), { ssr: false })
import Layout from '../src/components/layout'
// import { eventTrack } from '../src/utils/gtm'

const Landing = () => {
  const mq = useBreakpoint()
  // const router = useRouter()

  return (
    <Layout
      className='p-0'
      header={
        !mq.md
          ? {
              left: <></>,
              middle: <></>,
              right: <></>
            }
          : undefined
      }
      // customHeader={CustomHeader(mq, router.pathname)}
      // customFooter={CustomFooter(mq)}
      seo={{
        title: 'fe-template'
      }}
    >
      <Row justify='center' className={mq.md ? 'mt-12' : 'mt-2'}>
        <Col xs={24} md={18}>
          Content
        </Col>
      </Row>
    </Layout>
  )
}

Landing.getInitialProps = async () => {}

const mapStateToProps = () => ({})


const mapDispatchToProps = (dispatch: any) => ({
  // Login: (data: ILogin, referrer?: string) =>
  //   dispatch(actions.Auth.Login(data, referrer))
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
