import React from 'react'

import Format from '../../utils/format'

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  content: string
  tag?: 'div' | 'span'
}

const InnerHTML = (props: IProps) => {
  const { content, tag } = props

  const createMarkup = () => {
    return {
      __html: Format.Sanitize(content)
    }
  }

  if (tag === 'span') {
    return <span {...props} dangerouslySetInnerHTML={createMarkup()} />
  }

  return <div {...props} dangerouslySetInnerHTML={createMarkup()} />
}

InnerHTML.DefaultProps = {
  tag: 'div'
}

export default InnerHTML
