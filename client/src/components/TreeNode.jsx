import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { PAGE_TWO } from '../utils/consts';
import Tree from './Tree';

const TreeNode = ({ node }) => {
    const navigate = useNavigate()

    const { children, label } = node;

    const [showChildren, setShowChildren] = useState(false);

    const handleClick = () => {
        setShowChildren(!showChildren);
    };

    


    return (
        <>
            <div onClick={handleClick} style={{ marginBottom: "10px", cursor: "pointer" }}>
                <span>{label}</span>
            </div>
            <ul style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}>
                {showChildren && <Tree treeData={children} />}
            </ul>
        </>
    )
}

export default TreeNode;