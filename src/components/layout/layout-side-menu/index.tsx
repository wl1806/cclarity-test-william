import { Col, Image, Row, Typography } from 'antd'
import React from 'react'
import { useRouter } from 'next/router'
import css from "./style.module.css";

const {Text} = Typography
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

                      className={css.sideMenuImg}
                      preview={false}
                      src={image}
                    />
                  </Row>
                  <Row justify='center'>
                    <Text className={`${'text-family-open-sans'} ${isActive?css.activeSideMenu:css.inactiveSideMenu}`}>

                      {text}
                    </Text>
                  </Row>
                </Col>
              </Row>
  )
}

export default LayoutSideMenu
