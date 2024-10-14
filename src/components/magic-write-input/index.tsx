import { parseInt } from 'lodash'
import React, { useEffect, useState } from 'react'
import IAUthState from '../../interfaces/states/auth'
import IMagicWriteState from '../../interfaces/states/magic-write'
import { Button, Col, Input, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import PromptButton from '../prompt-button'

interface IProps {
  auth: IAUthState
  magicWrite: IMagicWriteState
  MagicWrite: (data: string) => Promise<any>
}

interface PromptButton {
  text: string
  image: string
  textPrompt: string
}

const prompts: PromptButton[] =[
  {
  text: 'My personal story',
  image: '/images/heart.png',
  textPrompt:'This is my personal story ...'
},
{
  text: 'My contrarian view',
  image: '/images/contrary.png',
  textPrompt:'This is my view ...'
},
{
  text: 'My challenge and solution',
  image: '/images/challenge.png',
  textPrompt:'This is my solution ...'
},
{
  text: 'A valuable insight',
  image: '/images/insight.png',
  textPrompt:'This is insight ...'
},
{
  text: 'What I did and learnt',
  image: '/images/check.png',
  textPrompt:'This is what I did ...'
},
{
  text: 'Promotion and offer',
  image: '/images/promote.png',
  textPrompt:'This is my offer ...'
}
]


const MagicWriteInput = (props: IProps) => {
  const { auth, magicWrite, MagicWrite } = props
  const [input, setInput]  = useState<string>('')

  const onSubmit = () => {
    if (input == ''){
      return
    }

    MagicWrite(input)
  }

  useEffect(()=>{
    if(magicWrite.data){
      setInput(magicWrite?.data.suggestion)
    }
  },[magicWrite.data])

  return (
    <Row justify='center'>
      <Col>
        <Row className='mt-8' justify='center'>
          <Text className='text-m-medium'>
            Hi {auth?.data?.name}, welcome to CClarity
          </Text>
        </Row>
        <Row className='mt-8' justify='center'>
        <Text className='text-l-medium text-family-montserrat'>
            What do you want to write today?
          </Text>
          </Row>
          <Row className='mt-8'>
          {prompts.map(e=>{
            return <Col span={8}>
              <PromptButton
                onClick={()=>setInput(e.textPrompt)}
                image={e.image}
                text={e.text}
              />
            </Col>
          })}
        </Row>
        <Row className='mt-8'>
  <Col span={24}>
    <Input.TextArea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      rows={10}
      placeholder=""
      style={{ width: '100%' }}
    />
  </Col>
        </Row>
        <Button type="primary" onClick={onSubmit}>Submit</Button>
      </Col>
    </Row>
  )
}

export default MagicWriteInput
