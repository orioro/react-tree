import React from 'react'
import { css, cx } from '@emotion/css'

export type TreeProps = {
  className?: string
  someProp: string
}

export const Tree = ({
  className,
  someProp,
}: TreeProps): React.ReactElement => {
  return (
    <div
      className={cx(
        className,
        css`
          background-color: hotpink;
          &:hover {
            color: white;
            cursor: pointer;
          }
        `
      )}>
      tree: {someProp}
    </div>
  )
}
