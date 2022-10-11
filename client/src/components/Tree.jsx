import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PAGE_TWO } from '../utils/consts'
import TreeNode from './TreeNode'

const Tree = ({ treeData }) => {
  
  const navigate = useNavigate()

  return (
    <ul>
      {treeData.map((node) => (
        <TreeNode node={node} onClick={() => navigate(PAGE_TWO)} key={node.key} />
      ))}
    </ul>
  )
}

export default Tree