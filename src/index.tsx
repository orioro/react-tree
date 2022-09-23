import React, { createContext, useContext } from 'react'

export type Node = {
  id: string | number
  childNodes?: Node[]
  [key: string]: any
}

export type TreeContext = {
  getChildNodes: (node: Node) => Node[]
  renderBranch: (
    node: Node,
    opts: {
      level: number
      index: number
      children: React.ReactNode
      nodes: Node[]
    }
  ) => JSX.Element
  renderLeaf: (
    node: Node,
    opts: {
      level: number
      index: number
      nodes: Node[]
    }
  ) => JSX.Element
}

export const DEFAULT_TREE_CONTEXT: TreeContext = {
  getChildNodes: (node) => node.childNodes || [],
  renderLeaf: (node, { level }) => (
    <div className='TreeNode TreeNode--Leaf'>
      <div className='TreeNode__Label'>
        {node.id} ({level})
      </div>
    </div>
  ),
  renderBranch: (node, { children, level }) => (
    <div className='TreeNode TreeNode--Branch'>
      <div className='TreeNode__Label'>
        {node.id} ({level})
      </div>
      <div className='TreeNode__ChildNodeContainer'>{children}</div>
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
        <TreeNode
          key={node.id}
          node={node}
          level={level}
          index={index}
          nodes={nodes}
        />
      ))}
    </React.Fragment>
  )
}
TreeNodeList.displayName = 'TreeNodeList'

export const TreeNode = ({
  node,
  level = 0,
  index,
  nodes,
}: {
  node: Node
  level?: number
  index: number
  nodes: Node[]
}) => {
  const { getChildNodes, renderLeaf, renderBranch } = useContext(TreeContext)
  const childNodes = getChildNodes(node)

  return Array.isArray(childNodes)
    ? renderBranch(node, {
        level,
        index,
        nodes,
        children: <TreeNodeList nodes={childNodes} level={level + 1} />,
      })
    : renderLeaf(node, {
        level,
        index,
        nodes,
      })
}
TreeNode.displayName = 'TreeNode'
