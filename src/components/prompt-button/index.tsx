import React from 'react'
import { Typography, Button, Col, Image, Row } from 'antd'
import css from './style.module.css'
const {Text} = Typography

interface IProps {
  text: string
  textM: string
  image: string
  onClick: () => void
  active: boolean
  isMobile: boolean
}


const PromptButton = (props: IProps) => {
  const { text, image, active, isMobile,textM, onClick } = props
  
  return (
    <Row className='mb-1' justify='center'>

      <Button className={`${css.promptBtn} ${active?css.activeButton:''}`} onClick={onClick}>
        <Row>
          <Col>
      <Image
        className={css.btnPromptImg}
        preview={false} src={image} />
        </Col>
        <Col>
        <Text className={`ml--5 ${css.promptText} text-family-open-sans`}>{isMobile?textM:text}</Text>
  </Col>
  </Row>
    </Button>
    </Row>
      
  )
}

export default PromptButton
