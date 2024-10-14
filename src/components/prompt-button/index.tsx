import React from 'react'
import { Button, Col, Image } from 'antd'
import Text from 'antd/lib/typography/Text'

interface IProps {
  text: string
  image: string
  onClick: () => void
}


const PromptButton = (props: IProps) => {
  const { text, image, onClick } = props
  
  return (
    <Button onClick={onClick}>
      <Col>
    <Image preview={false} src={image} />
</Col>
      <Col>
      <Text>{text}</Text>
</Col>
      
    </Button>
  )
}

export default PromptButton
