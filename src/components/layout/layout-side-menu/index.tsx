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
    <Row onClick={()=>router.push(path)}>
                <Col>
                  <Row>
                    <Image
                      wrapperClassName='side-menu-img-wrap'
                      className='side-menu-img'
                      preview={false}
                      src={image}
                    />
                  </Row>
                  <Row>
                    <Text>
                      {text}
                    </Text>
                  </Row>
                </Col>
              </Row>
  )
}

export default LayoutSideMenu
