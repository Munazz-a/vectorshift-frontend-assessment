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


// UTILITIES & FACTORY

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

// ORIGINAL NODES (Refactored with abstraction)

export {
  InputNode,
  OutputNode,
  LLMNode,
} from './nodes/nodesRefactored';
export { TextNode } from './nodes/textNode';


// NEW EXAMPLE NODES

export {
  FilterNode,
  DatabaseNode,
  APINode,
  FormatterNode,
  ConditionalNode,
  JoinNode,
} from './nodes/exampleNodes';


// NODE TYPE MAPPING (for ReactFlow)

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

