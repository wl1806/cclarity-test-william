import React from 'react'
import { Button, Col, Image, Row } from 'antd'
import './style.css'
import Text from 'antd/lib/typography/Text'

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

      <Button className={`prompt-btn ${active?'active-button':''}`} onClick={onClick}>
        <Row>
          <Col>
      <Image
        className='btn-prompt-img'
        preview={false} src={image} />
        </Col>
        <Col>
        <Text className='ml--5 prompt-text text-family-open-sans'>{isMobile?textM:text}</Text>
  </Col>
  </Row>
    </Button>
    </Row>
      
  )
}

export default PromptButton
