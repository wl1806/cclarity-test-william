import { Button, Col, Row, Typography } from 'antd'
import NextLink from 'next/link'
import React from 'react'
import { connect } from 'react-redux'

import T from '../../../src/utils/translation'
import TEXTS from '../../constants/translation-copy'
import { ReduxState } from '../../store/reducers'
import { CRNotFound } from '../icon'

const { Text, Paragraph } = Typography

interface IProps {
  icon?: React.ReactNode
  title?: string | React.ReactNode
  subtitle?: string | React.ReactNode
  cta?: boolean | React.ReactNode
  className?: string
  background?: string
  language: string
}

const NotFound = (props: IProps) => {
  const { icon, title, subtitle, cta, className, language, background } = props

  return (
    <Row
      justify='center'
      align='middle'
      className={`${className} ${background ? background : 'bg-light-blue'}`}
    >
      <Col span={24}>
        <Row>
          <Col xs={24} md={{ span: 12, offset: 6 }}>
            <Row justify='center'>{icon || <CRNotFound size={54} />}</Row>
            <Row className='mt-2' justify='center'>
              {typeof title === 'string' ? (
                <Text className='text-center text-color-primary-purple text-l-medium mt-2'>
                  {title || T(TEXTS.NOT_FOUND_TITLE, { locale: language })}
                </Text>
              ) : (
                title
              )}
            </Row>
            {typeof subtitle === 'string' ? (
              <Paragraph className='text-center text-color-second-dark-purple text-size-12 text-height-18 mt-2'>
                {subtitle || T(TEXTS.NOT_FOUND_SUBTITLE, { locale: language })}
              </Paragraph>
            ) : (
              subtitle
            )}
            {cta ? (
              typeof cta === 'boolean' ? (
                <Row className='mt-2' justify='center'>
                  <NextLink href='/explore' passHref>
                    <Button size='large' type='primary'>
                      {T(TEXTS.EXPLORE, { locale: language })}
                    </Button>
                  </NextLink>
                </Row>
              ) : (
                <>{cta}</>
              )
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  language: state.language
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
