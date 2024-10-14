import React, { useEffect, useState } from 'react'
import IAUthState from '../../interfaces/states/auth'
import IMagicWriteState from '../../interfaces/states/magic-write'
import { Button, Col, Image, Input, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import PromptButton from '../prompt-button'
import './style.css'

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
const [activePrompt, setActivePrompt] = useState<string>("")
const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(magicWrite.data){
      setInput(magicWrite?.data.suggestion)
    }
  },[magicWrite.data?.suggestion])

  useEffect(()=>{
    setLoading(magicWrite.requesting||false)
  },[magicWrite.requesting])

  
  return (
    <Row justify='center'>
      <Col>
        <Row className='mt-16' justify='center'>
          <Text className='text-family-open-sans text-size-20'>
            Hi {auth?.data?.name}, welcome to CClarity
          </Text>
        </Row>
        <Row className='mt-1' justify='center'>
        <Text className='text-size-32 text-weight-bold text-family-montserrat'>
            What do you want to write today?
          </Text>
          </Row>
          <Row justify='center' className='prompt-wrapper mt-24'>
          {prompts.map(e=>{
            return <Col span={8}>
              <PromptButton
                onClick={()=>{
                  setInput(e.textPrompt)
                  setActivePrompt(e.text)
                }}
                image={e.image}
                text={e.text}
                active={e.text === activePrompt}
              />
            </Col>
          })}
        </Row>
        <Row className='mt-8' justify='center'>
    <Input.TextArea
      value={input}
      disabled={loading}
      onChange={(e) => setInput(e.target.value)}
      rows={10}
      placeholder=""
      style={{ width: '70%' }}
    />
        </Row>
        <Row className='w-100 pb-20' justify='center'>
            <Row justify='end' className='mt-1 magic-btn-wrapper'>

            <Button 
            loading={loading}
            disabled={input===''} 
            className={`${input===''?'inactive-magic-button':'active-magic-button'}`} 
            onClick={()=>MagicWrite(input)}
            >
            <Row>
              <Col>
              {loading?<></>:
          <Image
            className='btn-magic-img'
            preview={false} src={input===''?'/images/magic_white.png':'/images/magic_black.png'} />
              }
            </Col>
            <Col>
            <Text className='ml--5 text-family-open-sans'>Magic write</Text>
      </Col>
      </Row>
        </Button>
            </Row>
        </Row>
      </Col>
    </Row>
  )
}

export default MagicWriteInput
