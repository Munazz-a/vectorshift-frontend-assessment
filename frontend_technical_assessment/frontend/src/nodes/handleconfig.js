// handleConfig.js
// Centralized handle configuration for all node types

import { Handle, Position } from 'reactflow';
import React from 'react';

/**
 * Predefined handle positions and configurations
 * Can be reused across nodes or customized per node
 */

export const HANDLE_POSITIONS = {
  LEFT: Position.Left,
  RIGHT: Position.Right,
  TOP: Position.Top,
  BOTTOM: Position.Bottom,
};

/**
 * Create a single handle with standard configuration
 * @param {string} id - unique handle id
 * @param {string} type - 'source' or 'target'
 * @param {string} position - Position from reactflow
 * @param {number} offset - top/bottom offset percentage (optional)
 * @param {string} label - label for the handle (optional)
 */
export const createHandle = (id, type, position, offset = null, label = null) => ({
  id,
  type,
  position,
  offset,
  label,
});

/**
 * Render handles from configuration
 * @param {Array} handlesConfig - array of handle configurations
 * @returns {JSX.Element[]} - rendered handle elements
 */
export const renderHandles = (handlesConfig) => {
  return handlesConfig.map((handleConfig) => {
    const style = {
      width: '8px',
      height: '8px',
    };

    if (handleConfig.offset !== null) {
      style.top = `${handleConfig.offset}%`;
      style.transform = 'translateY(-50%)';
    } 

    // if(handleConfig.position === HANDLE_POSITIONS.Right){
    //   style.right = '-6px';
    // }

    // if(handleConfig.position === HANDLE_POSITIONS.Left){
    //   style.left = '-6px';
    // }

    return (
      <Handle
        key={handleConfig.id}
        id={handleConfig.id}
        type={handleConfig.type}
        position={handleConfig.position}
        style={style}
        title={handleConfig.label}
      />
    );
  });
};

/**
 * Predefined handle configurations for common node patterns
 */

// Single output node (InputNode, TextNode pattern)
export const HANDLES_SINGLE_OUTPUT = (id) => [
  createHandle(`${id}-output`, 'source', HANDLE_POSITIONS.RIGHT),
];

// Single input node (OutputNode pattern)
export const HANDLES_SINGLE_INPUT = (id) => [
  createHandle(`${id}-input`, 'target', HANDLE_POSITIONS.LEFT),
];

// LLM Node pattern - Multiple inputs, single output
export const HANDLES_LLM = (id) => [
  createHandle(`${id}-system`, 'target', HANDLE_POSITIONS.LEFT, 33.33, 'system'),
  createHandle(`${id}-prompt`, 'target', HANDLE_POSITIONS.LEFT, 66.66, 'prompt'),
  createHandle(`${id}-output`, 'source', HANDLE_POSITIONS.RIGHT),
];

// Splitter pattern - Single input, multiple outputs
export const HANDLES_SPLITTER = (id) => [
  createHandle(`${id}-input`, 'target', HANDLE_POSITIONS.LEFT),
  createHandle(`${id}-output1`, 'source', HANDLE_POSITIONS.RIGHT, 33.33, 'output 1'),
  createHandle(`${id}-output2`, 'source', HANDLE_POSITIONS.RIGHT, 66.66, 'output 2'),
];

// Merger pattern - Multiple inputs, single output
export const HANDLES_MERGER = (id) => [
  createHandle(`${id}-input1`, 'target', HANDLE_POSITIONS.LEFT, 33.33, 'input 1'),
  createHandle(`${id}-input2`, 'target', HANDLE_POSITIONS.LEFT, 66.66, 'input 2'),
  createHandle(`${id}-output`, 'source', HANDLE_POSITIONS.RIGHT),
];

// Both sides pattern - Input on left, outputs on right
export const HANDLES_PROCESSOR = (id) => [
  createHandle(`${id}-input`, 'target', HANDLE_POSITIONS.LEFT),
  createHandle(`${id}-success`, 'source', HANDLE_POSITIONS.RIGHT, 33.33, 'success'),
  createHandle(`${id}-error`, 'source', HANDLE_POSITIONS.RIGHT, 66.66, 'error'),
];

// Custom handler - Build your own handles array
export const createCustomHandles = (handleConfigs, nodeId) => {
  return handleConfigs.map((config) => ({
    ...config,
    id: `${nodeId}-${config.id}`,
  }));
};