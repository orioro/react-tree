import React, { createContext, useContext } from 'react'

export type NodeAttributes = {
  id: string | number
  [key: string]: any
}

export type Node = [NodeAttributes, Node[]]

export type TreeContext = {
  renderBranch: (
    node: NodeAttributes,
    opts: {
      level: number
      index: number
      children: React.ReactNode
    }
  ) => JSX.Element
  renderLeaf: (
    node: NodeAttributes,
    opts: {
      level: number
      index: number
    }
  ) => JSX.Element
}

export const DEFAULT_TREE_CONTEXT: TreeContext = {
  renderBranch: (nodeAttributes, { children, level }) => (
    <div className='TreeNode TreeNode--Branch'>
      <div className='TreeNode__Label'>
        {nodeAttributes.id} ({level})
      </div>
      <div className='TreeNode__ChildNodeContainer'>{children}</div>
    </div>
  ),
  renderLeaf: (nodeAttributes, { level }) => (
    <div className='TreeNode TreeNode--Leaf'>
      <div className='TreeNode__Label'>
        {nodeAttributes.id} ({level})
      </div>
    </div>
  ),
}

export const TreeContext = createContext(DEFAULT_TREE_CONTEXT)

export const TreeNodeList = ({
  nodes,
  level = 0,
}: {
  nodes: Node[]
  level: number
}) => {
  return (
    <React.Fragment>
      {nodes.map((node, index, nodes) => (
        <TreeNode key={node[0].id} node={node} level={level} index={index} />
      ))}
    </React.Fragment>
  )
}
TreeNodeList.displayName = 'TreeNodeList'

export const TreeNode = ({
  node: [nodeAttributes, childNodes],
  level = 0,
  index,
}: {
  node: Node
  level?: number
  index: number
}) => {
  const { renderLeaf, renderBranch } = useContext(TreeContext)

  return Array.isArray(childNodes)
    ? renderBranch(nodeAttributes, {
        level,
        index,
        children: <TreeNodeList nodes={childNodes} level={level + 1} />,
      })
    : renderLeaf(nodeAttributes, {
        level,
        index,
      })
}
TreeNode.displayName = 'TreeNode'
