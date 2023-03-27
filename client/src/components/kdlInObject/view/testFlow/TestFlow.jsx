import { useCallback, useState } from "react";
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
    {
        id: "1",
        data: { label: "Hello" },
        position: { x: 0, y: 0 },
        type: "input",
    },
    {
        id: "2",
        data: { label: "World" },
        position: { x: 100, y: 100 },
    },
    {
        id: "3",
        data: { label: "Two" },
        position: { x: 150, y: 150 },
    },
];

const initialEdges = [];

function TestFlow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    return (
        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
        >
            <Background />

            <Controls />
        </ReactFlow>
    );
}

export default TestFlow;
