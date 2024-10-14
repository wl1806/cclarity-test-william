import { parseInt } from 'lodash'
import React from 'react'

interface IProps {
  content: string
  percentage: string
  animate?: boolean
  pbHeight?: number
  hypesBudgetNearEnd?: boolean
  style?: any
  styleWrapper?: any
}

const ProgressBar = (props: IProps) => {
  const {
    content,
    percentage,
    animate,
    pbHeight,
    hypesBudgetNearEnd,
    style,
    styleWrapper
  } = props
  const pctgNumber = parseInt(percentage.slice(0, -1))

  const mergeStyle = {
    ...style,
    ...(pbHeight ? { height: pbHeight } : {})
  }
  return (
    <div
      className={`progress ${
        hypesBudgetNearEnd ? 'hypes-progress-bar-near-end' : ''
      }`}
      style={mergeStyle}
    >
      <div
        className={
          pctgNumber === 100 ? 'back-done' : animate ? 'back-animated' : 'back'
        }
      >
        {content}
      </div>

      <div
        className='front'
        style={{
          ...styleWrapper,
          ...(parseInt(percentage, 10) > 0
            ? {
                clipPath: `inset(0 0 0 ${percentage})`
              }
            : {})
        }}
      >
        {content}
      </div>
    </div>
  )
}

export default ProgressBar
