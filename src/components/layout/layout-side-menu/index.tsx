import { Col, Image, Row } from 'antd'
import React from 'react'
import { useRouter } from 'next/router'
import Text from 'antd/lib/typography/Text'

interface IProps {
  text: string
  path: string
  image: string
  isActive?: boolean
}

const LayoutSideMenu = (props: IProps) => {
  const {
    image,
    path,
    text,
    isActive
  } = props
  const router = useRouter()
  
  return (
    <Row onClick={()=>router.push(path)} className='mv-2 use-pointer' style={{placeContent:'center'}}>
                <Col>
                  <Row justify='center'>
                    <Image
                      wrapperClassName='side-menu-img-wrap'
                      className='side-menu-img'
                      preview={false}
                      src={image}
                    />
                  </Row>
                  <Row justify='center'>
                    <Text className={`${'text-family-open-sans'} ${isActive?'active-side-menu':'inactive-side-menu'}`}>
                      {text}
                    </Text>
                  </Row>
                </Col>
              </Row>
  )
}

export default LayoutSideMenu
