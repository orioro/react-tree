import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

export const DEFAULT_TREE_CONTEXT = {
  getId: node => node.id,
  getChildNodes: node => node.childNodes,
  renderLeaf: ({ id }, { level }) => (
    <div className='TreeNode TreeNode--Leaf'>
      <div className='TreeNode__Label'>{id} ({ level })</div>
    </div>
  ),
  renderBranch: ({ id }, { children, level }) => (
    <div className='TreeNode TreeNode--Branch'>
      <div className='TreeNode__Label'>{id} ({ level })</div>
      <div className='TreeNode__ChildNodeContainer'>{children}</div>
    </div>
  )
}

export const TreeContext = createContext(DEFAULT_TREE_CONTEXT)

export const TreeNodeList = ({ nodes, level = 0 }) => {
  const { getId } = useContext(TreeContext)

  return <React.Fragment>
    {nodes.map((node, index, nodes) => (
      <TreeNode
        key={getId(node)}
        node={node}
        level={level}
        index={index}
        nodes={nodes}
      />
    ))}
  </React.Fragment>
}
TreeNodeList.displayName = 'TreeNodeList'
TreeNodeList.propTypes = {
  nodes: PropTypes.array.isRequired
}


export const TreeNode = ({ node, level = 0, index, nodes }) => {
  const {
    getChildNodes,
    renderLeaf,
    renderBranch,
  } = useContext(TreeContext)
  const childNodes = getChildNodes(node)

  return Array.isArray(childNodes)
    ? renderBranch(node, {
        level,
        index,
        nodes,
        children: <TreeNodeList
          nodes={childNodes}
          level={level + 1}
        />
      })
    : renderLeaf(node, {
        level,
        index,
        nodes,
      })
}
TreeNode.displayName = 'TreeNode'
TreeNode.propTypes = {
  node: PropTypes.object.isRequired
}
