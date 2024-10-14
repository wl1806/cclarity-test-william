import { Breakpoint } from 'antd/lib/_util/responsiveObserve'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { FunctionComponent } from 'react'

type ScreenWidthChildren = (
  screenWidth: Partial<Record<Breakpoint, boolean>>
) => any

interface IScreenWidthProps {
  children: ScreenWidthChildren
}

export const ScreenWidth: FunctionComponent<IScreenWidthProps> = ({
  children
}) => {
  const screenWidth = useBreakpoint()

  return children(screenWidth)
}
