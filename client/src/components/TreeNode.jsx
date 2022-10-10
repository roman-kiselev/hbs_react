import React, {useState} from 'react'
import Tree from './Tree';

const TreeNode = ({ node }) => {
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