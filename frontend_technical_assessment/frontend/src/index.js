// index.js
// Central export file for all nodes and utilities
// Import this in your main React app 

import { InputNode } from './nodes/nodesRefactored';
import { OutputNode } from './nodes/nodesRefactored';
import { LLMNode } from './nodes/nodesRefactored';
import { TextNode } from './nodes/textNode';

import { FilterNode } from './nodes/exampleNodes';
import { DatabaseNode } from './nodes/exampleNodes';
import { APINode } from './nodes/exampleNodes';
import { FormatterNode } from './nodes/exampleNodes';
import { ConditionalNode } from './nodes/exampleNodes';
import { JoinNode } from './nodes/exampleNodes';


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// ============================================
// UTILITIES & FACTORY
// ============================================
export { createNodeComponent } from './nodes/baseNode';
export {
  HANDLE_POSITIONS,
  createHandle,
  renderHandles,
  HANDLES_SINGLE_OUTPUT,
  HANDLES_SINGLE_INPUT,
  HANDLES_LLM,
  HANDLES_SPLITTER,
  HANDLES_MERGER,
  HANDLES_PROCESSOR,
  createCustomHandles,
} from './nodes/handleconfig';

// ============================================
// ORIGINAL NODES (Refactored with abstraction)
// ============================================
export {
  InputNode,
  OutputNode,
  LLMNode,
} from './nodes/nodesRefactored';
export { TextNode } from './nodes/textNode';

// ============================================
// NEW EXAMPLE NODES (5 + 1 bonus)
// ============================================
export {
  FilterNode,
  DatabaseNode,
  APINode,
  FormatterNode,
  ConditionalNode,
  JoinNode,
} from './nodes/exampleNodes';

// ============================================
// NODE TYPE MAPPING (for ReactFlow)
// ============================================
export const nodeTypes = {
  // Original nodes
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  text: TextNode,
  
  // New nodes
  filter: FilterNode,
  database: DatabaseNode,
  api: APINode,
  formatter: FormatterNode,
  conditional: ConditionalNode,
  join: JoinNode,
};

// ============================================
// EXAMPLE USAGE IN YOUR MAIN APP
// ============================================

/*
import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  addEdge, 
  Controls, 
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { nodeTypes } from './nodes';
import 'reactflow/dist/style.css';

function PipelineBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addNode = (type, id) => {
    setNodes((nds) => [
      ...nds,
      {
        id,
        type,
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        data: {},
      },
    ]);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
      </ReactFlow>
      
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
        <button onClick={() => addNode('input', `input-${Date.now()}`)}>
          + Input
        </button>
        <button onClick={() => addNode('text', `text-${Date.now()}`)}>
          + Text
        </button>
        <button onClick={() => addNode('llm', `llm-${Date.now()}`)}>
          + LLM
        </button>
        <button onClick={() => addNode('filter', `filter-${Date.now()}`)}>
          + Filter
        </button>
        <button onClick={() => addNode('api', `api-${Date.now()}`)}>
          + API
        </button>
        <button onClick={() => addNode('conditional', `cond-${Date.now()}`)}>
          + Conditional
        </button>
        <button onClick={() => addNode('output', `output-${Date.now()}`)}>
          + Output
        </button>
      </div>
    </div>
  );
}

export default PipelineBuilder;
*/