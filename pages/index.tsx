import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
// import Router, { useRouter } from 'next/router'
import React from 'react'
import { connect } from 'react-redux'

import Layout from '../src/components/layout'
import actions from '../src/store/actions'
import { ReduxState } from '../src/store/reducers'
import IAuthState from '../src/interfaces/states/auth'
import IMagicWriteState from '../src/interfaces/states/magic-write'
import MagicWriteInput from '../src/components/magic-write-input'


interface IProps {
  auth: IAuthState
  magicWrite: IMagicWriteState
  MagicWrite: (data: string) => Promise<any>
}

const Landing = (props: IProps) => {
  const {auth, magicWrite, MagicWrite} = props
  const mq = useBreakpoint()
  return (
    <Layout
      className='p-0'
    >
      <MagicWriteInput
        auth={auth}
        magicWrite={magicWrite}
        MagicWrite={MagicWrite}
      />
    </Layout>
  )
}

Landing.getInitialProps = async (ctx: any) => {
  await ctx.store.dispatch(
    actions.Auth.GetUser(ctx)
  ) 
}

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
  magicWrite: state.magicWrite
})


const mapDispatchToProps = (dispatch: any) => ({
  MagicWrite: (data: string) => dispatch(actions.MagicWrite.GetSuggestion(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
