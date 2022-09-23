import React, { useState, memo } from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { TreeNodeList, TreeContext } from './index'

const App = () => {
  const treeNodes = [
    {
      id: 'node1',
      childNodes: [
        {
          id: 'node11',
          childNodes: [
            {
              id: 'node111',
            },
            {
              id: 'node112',
            },
            {
              id: 'node113',
            },
          ],
        },
        {
          id: 'node12',
        },
      ],
    },
    {
      id: 'node2',
    },
  ]

  return <TreeNodeList nodes={treeNodes} />
}

storiesOf('Tree', module).add('with text', () => <App />)
