import React from 'react'
import { treeModel, fromNodeArray } from '@orioro/tree-model'

import { storiesOf } from '@storybook/react'

import { TreeNodeList } from './index'

import './index.stories.css'

function Basic() {
  const tree = treeModel()

  const options = [
    {
      id: 'Add',
      label: '+',
    },
    {
      id: 'File',
    },
    {
      id: 'Edit',
      disabled: true,
      groupId: 'group-a',
    },
    {
      id: 'View',
      groupId: 'group-a',
    },
    {
      id: 'ViewNewTab',
      parentId: 'View',
      groupId: 'group-a',
    },
    {
      id: 'Shape',
      groupId: 'group-b',
    },
    {
      id: 'ShapeRectangle',
      disabled: true,
      parentId: 'Add',
      accelerator: 'r',
    },
    {
      id: 'ShapeCircle',
      disabled: true,
      parentId: 'Add',
      accelerator: 'Cmd + i',
    },
    {
      id: 'ShapeOther',
      parentId: 'Add',
    },
    {
      id: 'ShapeImage',
      parentId: 'ShapeOther',
    },
    {
      id: 'ShapeVector',
      parentId: 'ShapeOther',
    },
    {
      id: 'ShapeFormElements',
      parentId: 'ShapeOther',
    },
    {
      id: 'ShapeTextInput',
      parentId: 'ShapeFormElements',
    },
    {
      id: 'ShapeTextArea',
      parentId: 'ShapeFormElements',
    },
    {
      id: 'ShapeYetAnotherShape',
      parentId: 'ShapeOther',
      groupId: 'group-a',
    },
    {
      id: 'Find',
      groupId: 'group-b',
    },
  ]

  const optionsById = fromNodeArray(options)

  const rootNodes = tree
    .nodeArray(optionsById)
    .filter((option) => !option.parentId)
    .map((option) => tree.nodeTree(optionsById, option.id))

  return <TreeNodeList nodes={rootNodes} />
}

storiesOf('Tree', module).add('Basic', () => <Basic />)
