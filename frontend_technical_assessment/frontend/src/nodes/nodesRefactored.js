// refactoredNodes.js
// Existing nodes refactored using BaseNode abstraction

import { createNodeComponent } from './baseNode';
import {
  HANDLES_SINGLE_OUTPUT,
  HANDLES_SINGLE_INPUT,
  HANDLES_LLM,
} from './handleconfig';

/**
 * INPUT NODE - Refactored
 * Demonstrates how much simpler nodes become with the abstraction
 */
export const InputNode = createNodeComponent({
  title: 'Input',
  description: 'Define pipeline input',
  className: 'input-node',
  width: 220,
  getHandles: HANDLES_SINGLE_OUTPUT,
  fields: [
    {
      name: 'inputName',
      label: 'Name',
      type: 'input',
      placeholder: 'input_1',
    },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' },
        { value: 'Number', label: 'Number' },
      ],
    },
  ],
  initialState: {
    inputName: 'input_1',
    inputType: 'Text',
  },
});

/**
 * OUTPUT NODE - Refactored
 */
export const OutputNode = createNodeComponent({
  title: 'Output',
  description: 'Define pipeline output',
  className: 'output-node',
  width: 220,
  getHandles: HANDLES_SINGLE_INPUT,
  fields: [
    {
      name: 'outputName',
      label: 'Name',
      type: 'input',
      placeholder: 'output_1',
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'Image', label: 'Image' },
        { value: 'File', label: 'File' },
      ],
    },
  ],
  initialState: {
    outputName: 'output_1',
    outputType: 'Text',
  },
});

/**
 * LLM NODE - Refactored
 */
export const LLMNode = createNodeComponent({
  title: 'LLM',
  description: 'Language Model',
  className: 'llm-node',
  width: 240,
  getHandles: HANDLES_LLM,
  fields: [
    {
      name: 'model',
      label: 'Model',
      type: 'select',
      options: [
        { value: 'gpt-4', label: 'GPT-4' },
        { value: 'gpt-3.5', label: 'GPT-3.5' },
        { value: 'claude', label: 'Claude' },
      ],
    },
    {
      name: 'temperature',
      label: 'Temperature',
      type: 'input',
      placeholder: '0.7',
    },
  ],
  initialState: {
    model: 'gpt-4',
    temperature: '0.7',
  },
});


