// nodes/textNode.js (or in refactoredNodes.js)
import { useState, useRef, useEffect } from 'react';
import { createHandle, HANDLE_POSITIONS, renderHandles } from './handleconfig';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  // ===== PART 3.1: AUTO-SIZING =====
  const adjustSize = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    const scrollHeight = textareaRef.current.scrollHeight;
    const newHeight = Math.min(Math.max(scrollHeight + 20, 60), 300);
    textareaRef.current.style.height = `${newHeight}px`;
  };

  // ===== PART 3.2: VARIABLE EXTRACTION =====
  const extractVariables = (text) => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$-]*)\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    const uniqueVariables = [...new Set(matches)];
    setVariables(uniqueVariables);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    extractVariables(newText);
    adjustSize();
  };

  useEffect(() => {
    adjustSize();
    extractVariables(currText);
  }, [currText]);

  // ===== GENERATE HANDLES =====
  const staticHandles = [
    createHandle(`${id}-output`, 'source', HANDLE_POSITIONS.RIGHT),
  ];

  const variableHandles = variables.map((variable, index) => {
    const offsetPercentage = ((index + 1) / (variables.length + 1)) * 100;
    return createHandle(
      `${id}-${variable}`,
      'target',
      HANDLE_POSITIONS.LEFT,
      offsetPercentage,
      variable
    );
  });

  const allHandles = [...variableHandles, ...staticHandles];
  const minHeightNeeded = 140;

  return (
    <div
      ref={containerRef}
      style={{
        minWidth: 280,
        minHeight: minHeightNeeded,
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '12px',
        backgroundColor: '#fff',
        boxShadow: selected ? '0 4px 16px rgba(61, 95, 168, 0.25)' : '0 2px 4px rgba(0,0,0,0.08)',
        fontFamily: 'inherit',
        fontSize: '12px',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '8px',
          color: '#1e2139',
          letterSpacing: '0.3px',
        }}
      >
        Text
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={currText}
        onChange={handleTextChange}
        placeholder="Enter text with {{variables}}"
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #d1d5db',
          fontSize: '12px',
          fontFamily: 'monospace',
          resize: 'none',
          overflow: 'hidden',
          boxSizing: 'border-box',
          lineHeight: '1.4',
          transition: 'all 0.2s ease',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#3d5fa8';
          e.target.style.boxShadow = '0 0 0 3px rgba(61, 95, 168, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#d1d5db';
          e.target.style.boxShadow = 'none';
        }}
      />

      {/* Variables Display */}
      {variables.length > 0 && (
        <div
          style={{
            marginTop: '8px',
            padding: '6px 8px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            fontSize: '11px',
            color: '#4b5563',
            maxHeight: '40px',
            overflow: 'auto',
            wordBreak: 'break-word',
            border: '1px solid #e5e7eb',
          }}
        >
          <strong style={{ color: '#1e2139' }}>Variables:</strong> {variables.join(', ')}
        </div>
      )}

      {/* Handles */}
      {renderHandles(allHandles)}
    </div>
  );
};














// nodes/textNode.js - HYBRID FIX (renderHandles + direct Handle)
import { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { renderHandles, createHandle, HANDLE_POSITIONS } from './handleconfig';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-sizing textarea
  const adjustSize = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    const scrollHeight = textareaRef.current.scrollHeight;
    const newHeight = Math.min(Math.max(scrollHeight + 20, 60), 300);
    textareaRef.current.style.height = `${newHeight}px`;
  };

  // Extract variables from {{variable}} patterns
  const extractVariables = (text) => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$-]*)\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    const uniqueVariables = [...new Set(matches)];
    setVariables(uniqueVariables);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    extractVariables(newText);
    adjustSize();
  };

  useEffect(() => {
    adjustSize();
    extractVariables(currText);
  }, [currText]);

  // Static output handle (use renderHandles for this)
  const staticHandles = [
    createHandle(`${id}-output`, 'source', HANDLE_POSITIONS.RIGHT),
  ];

  // Calculate min height based on variables
  const minHeightNeeded = Math.max(140, variables.length * 25 + 120);

  return (
    <div
      ref={containerRef}
      style={{
        minWidth: 280,
        minHeight: minHeightNeeded,
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '12px',
        backgroundColor: '#fff',
        boxShadow: selected ? '0 4px 16px rgba(61, 95, 168, 0.25)' : '0 2px 4px rgba(0,0,0,0.08)',
        fontFamily: 'inherit',
        fontSize: '12px',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '8px',
          color: '#1e2139',
          letterSpacing: '0.3px',
        }}
      >
        Text
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={currText}
        onChange={handleTextChange}
        placeholder="Enter text with {{variables}}"
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #d1d5db',
          fontSize: '12px',
          fontFamily: 'monospace',
          resize: 'none',
          overflow: 'hidden',
          boxSizing: 'border-box',
          lineHeight: '1.4',
          transition: 'all 0.2s ease',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#3d5fa8';
          e.target.style.boxShadow = '0 0 0 3px rgba(61, 95, 168, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#d1d5db';
          e.target.style.boxShadow = 'none';
        }}
      />

      {/* Variables Display */}
      {variables.length > 0 && (
        <div
          style={{
            marginTop: '8px',
            padding: '6px 8px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            fontSize: '11px',
            color: '#4b5563',
            maxHeight: '40px',
            overflow: 'auto',
            wordBreak: 'break-word',
            border: '1px solid #e5e7eb',
          }}
        >
          <strong style={{ color: '#1e2139' }}>Variables:</strong> {variables.join(', ')}
        </div>
      )}

      {/* STATIC HANDLES - Use renderHandles (works fine) */}
      {renderHandles(staticHandles)}

      {/* DYNAMIC VARIABLE HANDLES - Direct Handle elements (avoids timing issue) */}
      {/* {variables.map((variable, index) => {
        const totalVariables = variables.length;
        const topPercentage = ((index + 1) / (totalVariables + 1)) * 100;

        return (
          <Handle
            key={`${id}-${variable}`}
            id={`${id}-${variable}`}
            type="target"
            position={Position.Left}
            style={{
              top: `${topPercentage}%`,
              background: '#020504',
              width: 6,
              height: 6,
              borderRadius: '100%',
            }}
            title={variable}
          />
        );
      })} */}
    </div>
  );
};