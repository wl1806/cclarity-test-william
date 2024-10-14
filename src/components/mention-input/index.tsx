import 'emoji-mart/css/emoji-mart.css'

import { Button, Col, Popover, Row, Typography } from 'antd'
import { Picker } from 'emoji-mart'
import React, { useState } from 'react'
import { Mention, MentionsInput } from 'react-mentions'

import COLOR from '../../constants/color'
import { CREmoticon } from '../icon'

const { Text } = Typography

interface IProps {
  value?: any
  onChange: (e) => void
  placeholder: string
  onKeyDown?: (e) => void
  [x: string]: any
  error?: string
}

/**
 * markup => @[__display__](__id__)
 * pattern for replace mention user => @[@${comment?.user.fullName}](${comment?.user.id})
 */

const MentionInput = (props: IProps) => {
  const { value, onChange, placeholder, onKeyDown, error } = props
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({} as any), [])

  return (
    <>
      <Row
        className={`pv--5 ph-2 position-relative border-radius-22 ${
          error ? 'border-danger-main' : 'border-neutral-40'
        }`}
        style={{ border: '1.5px solid' }}
        wrap={false}
        align='bottom'
      >
        <Col flex='auto'>
          <Row className='mr-2 cr-mention-input'>
            <MentionsInput
              {...props}
              rows={4}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className='w-100'
              markup='@[__display__](__id__)'
              placeholder={placeholder}
              onKeyDown={onKeyDown}
            >
              <Mention
                trigger='@'
                data={() => {}}
                renderSuggestion={() => <></>}
              />
            </MentionsInput>
          </Row>
        </Col>
        <Col className='cr-centered' onMouseDown={() => forceUpdate()}>
          <Popover
            placement='topRight'
            trigger='click'
            visible={isVisible}
            onVisibleChange={(visible) => setIsVisible(visible)}
            content={() => (
              <Picker
                set='google'
                showPreview={false}
                showSkinTones={false}
                onSelect={(emoji: any) => {
                  onChange(`${value || ''}${emoji.native}`)
                  setIsVisible(false)
                }}
              />
            )}
          >
            <Button type='link' className='ant-row-middle p-0' size='small'>
              <CREmoticon fill={COLOR['neutral-50']} size={20} />
            </Button>
          </Popover>
        </Col>
      </Row>
      {error && (
        <Text className='text-s-regular text-color-danger-main'>{error}</Text>
      )}
    </>
  )
}

export default MentionInput
