// newExampleNodes.js
// Five new node types created using the BaseNode abstraction
// These demonstrate the flexibility and power of the abstraction

import { createNodeComponent } from './baseNode';
import {
  // HANDLES_SINGLE_OUTPUT,
  // HANDLES_SINGLE_INPUT,
  HANDLES_PROCESSOR,
  HANDLES_MERGER,
  // HANDLES_SPLITTER,
  createHandle,
  HANDLE_POSITIONS,
} from './handleconfig';

/**
 * FILTER NODE
 * Filters input data based on a condition
 * Single input, single output (filtered data)
 */
export const FilterNode = createNodeComponent({
  title: 'Filter',
  description: 'Filter data based on condition',
  className: 'filter-node',
  width: 240,
  getHandles: HANDLES_PROCESSOR,
  fields: [
    {
      name: 'filterField',
      label: 'Field to Filter',
      type: 'input',
      placeholder: 'fieldName',
    },
    {
      name: 'filterCondition',
      label: 'Condition',
      type: 'select',
      options: [
        { value: 'equals', label: 'Equals' },
        { value: 'contains', label: 'Contains' },
        { value: 'gt', label: 'Greater Than' },
        { value: 'lt', label: 'Less Than' },
      ],
    },
    {
      name: 'filterValue',
      label: 'Filter Value',
      type: 'input',
      placeholder: 'value',
    },
  ],
  initialState: {
    filterField: '',
    filterCondition: 'equals',
    filterValue: '',
  },
});

/**
 * DATABASE NODE
 * Query or insert data into a database
 * Single input, single output
 */
export const DatabaseNode = createNodeComponent({
  title: 'Database',
  description: 'Query or modify database',
  className: 'database-node',
  width: 260,
  getHandles: HANDLES_PROCESSOR,
  fields: [
    {
      name: 'dbType',
      label: 'Database Type',
      type: 'select',
      options: [
        { value: 'postgres', label: 'PostgreSQL' },
        { value: 'mysql', label: 'MySQL' },
        { value: 'mongodb', label: 'MongoDB' },
      ],
    },
    {
      name: 'operation',
      label: 'Operation',
      type: 'select',
      options: [
        { value: 'select', label: 'SELECT' },
        { value: 'insert', label: 'INSERT' },
        { value: 'update', label: 'UPDATE' },
        { value: 'delete', label: 'DELETE' },
      ],
    },
    {
      name: 'query',
      label: 'Query/Table',
      type: 'textarea',
      rows: 4,
      placeholder: 'SELECT * FROM users WHERE...',
    },
  ],
  initialState: {
    dbType: 'postgres',
    operation: 'select',
    query: '',
  },
});

/**
 * API NODE
 * Make HTTP requests to external APIs
 * Single input, dual output (success/error)
 */
export const APINode = createNodeComponent({
  title: 'API Call',
  description: 'Make HTTP request to external API',
  className: 'api-node',
  width: 260,
  getHandles: HANDLES_PROCESSOR,
  fields: [
    {
      name: 'method',
      label: 'Method',
      type: 'select',
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' },
      ],
    },
    {
      name: 'endpoint',
      label: 'Endpoint URL',
      type: 'input',
      placeholder: 'https://api.example.com/...',
    },
    {
      name: 'headers',
      label: 'Headers (JSON)',
      type: 'textarea',
      rows: 3,
      placeholder: '{"Authorization": "Bearer token"}',
    },
  ],
  initialState: {
    method: 'GET',
    endpoint: '',
    headers: '{}',
  },
});

/**
 * FORMATTER NODE
 * Transform/format data (JSON, CSV, etc.)
 * Single input, single output
 */
export const FormatterNode = createNodeComponent({
  title: 'Formatter',
  description: 'Transform data format',
  className: 'formatter-node',
  width: 240,
  getHandles: HANDLES_PROCESSOR,
  fields: [
    {
      name: 'inputFormat',
      label: 'Input Format',
      type: 'select',
      options: [
        { value: 'json', label: 'JSON' },
        { value: 'csv', label: 'CSV' },
        { value: 'xml', label: 'XML' },
        { value: 'text', label: 'Plain Text' },
      ],
    },
    {
      name: 'outputFormat',
      label: 'Output Format',
      type: 'select',
      options: [
        { value: 'json', label: 'JSON' },
        { value: 'csv', label: 'CSV' },
        { value: 'xml', label: 'XML' },
        { value: 'text', label: 'Plain Text' },
      ],
    },
    {
      name: 'template',
      label: 'Transformation Template',
      type: 'textarea',
      rows: 3,
      placeholder: 'Define transformation rules...',
    },
  ],
  initialState: {
    inputFormat: 'json',
    outputFormat: 'csv',
    template: '',
  },
});

/**
 * CONDITIONAL NODE
 * Routes data based on a condition (if/else)
 * Single input, dual output (true/false branches)
 */
export const ConditionalNode = createNodeComponent({
  title: 'Conditional',
  description: 'Route data based on condition',
  className: 'conditional-node',
  width: 260,
  getHandles: (id) => [
    createHandle(`${id}-input`, 'target', HANDLE_POSITIONS.LEFT),
    createHandle(`${id}-true`, 'source', HANDLE_POSITIONS.RIGHT, 33.33, 'true'),
    createHandle(`${id}-false`, 'source', HANDLE_POSITIONS.RIGHT, 66.66, 'false'),
  ],
  fields: [
    {
      name: 'variable',
      label: 'Variable',
      type: 'input',
      placeholder: 'variableName',
    },
    {
      name: 'operator',
      label: 'Operator',
      type: 'select',
      options: [
        { value: 'equals', label: '==' },
        { value: 'notEquals', label: '!=' },
        { value: 'gt', label: '>' },
        { value: 'lt', label: '<' },
        { value: 'gte', label: '>=' },
        { value: 'lte', label: '<=' },
      ],
    },
    {
      name: 'compareValue',
      label: 'Compare Value',
      type: 'input',
      placeholder: 'value',
    },
  ],
  initialState: {
    variable: '',
    operator: 'equals',
    compareValue: '',
  },
});

/**
 * EXAMPLE: How to create a custom node with multiple inputs and outputs
 * using the custom handle function
 */
export const JoinNode = createNodeComponent({
  title: 'Join',
  description: 'Join data from multiple sources',
  className: 'join-node',
  width: 260,
  getHandles: HANDLES_MERGER,
  fields: [
    {
      name: 'joinType',
      label: 'Join Type',
      type: 'select',
      options: [
        { value: 'inner', label: 'Inner Join' },
        { value: 'left', label: 'Left Join' },
        { value: 'right', label: 'Right Join' },
        { value: 'full', label: 'Full Join' },
      ],
    },
    {
      name: 'joinKey',
      label: 'Join Key',
      type: 'input',
      placeholder: 'id',
    },
  ],
  initialState: {
    joinType: 'inner',
    joinKey: 'id',
  },
});

/**
 * Export all nodes
 */
// export {
//   FilterNode,
//   DatabaseNode,
//   APINode,
//   FormatterNode,
//   ConditionalNode,
//   JoinNode,
// };