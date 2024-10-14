import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import React from 'react'

const Back = ({ onBack }: { onBack?: () => void }) => {
  const router = useRouter()
  return (
    <a
      onClick={() => {
        onBack ? onBack() : router.back()
      }}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <ArrowLeftOutlined />
    </a>
  )
}

export default Back
