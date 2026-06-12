// BaseNode.js
// Abstract base component for all node types

import { useState } from 'react';
import { renderHandles } from './handleconfig';

export const createNodeComponent = (config) => {
  return ({ id, data, selected }) => {
    const [state, setState] = useState({
      ...config.initialState,
      ...data,
    });

    const handleChange = (field) => (e) => {
      const newValue = e.target.value;
      const newState = { ...state, [field]: newValue };
      setState(newState);

      if (config.onStateChange) {
        config.onStateChange(newState, id);
      }
    };

    const handles = config.getHandles(id);

    return (
      <div
        className={`
          base-node
          ${config.className || ''}
          ${selected ? 'ring-2 ring-navy-600' : ''}
        `}
        style={{
          position: 'relative',
          width: config.width || 220,
          height: 'auto',
          minHeight: config.minHeight || 100,
          padding: '12px',
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
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
          {config.title}
        </div>

        {/* Content */}
        <div style={{ marginBottom: '8px' }}>
          {config.customContent ? (
            config.customContent(state, handleChange, id)
          ) : (
            <NodeFields
              fields={config.fields}
              state={state}
              handleChange={handleChange}
            />
          )}
        </div>

        {/* Description */}
        {config.description && (
          <div
            style={{
              fontSize: '11px',
              color: '#6b7280',
              marginBottom: '8px',
              fontStyle: 'italic',
            }}
          >
            {config.description}
          </div>
        )}

        {/* Handles */}
        {renderHandles(handles)}
      </div>
    );
  };
};

const NodeFields = ({ fields, state, handleChange }) => {
  if (!fields || fields.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {fields.map((field) => {
        if (field.type === 'input') {
          return (
            <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#374151',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                }}
              >
                {field.label}
              </label>
              <input
                type="text"
                value={state[field.name] || ''}
                onChange={handleChange(field.name)}
                placeholder={field.placeholder || ''}
                style={{
                  padding: '6px 8px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  fontSize: '12px',
                  fontFamily: 'inherit',
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
            </div>
          );
        }

        if (field.type === 'textarea') {
          return (
            <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#374151',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                }}
              >
                {field.label}
              </label>
              <textarea
                value={state[field.name] || ''}
                onChange={handleChange(field.name)}
                placeholder={field.placeholder || ''}
                rows={field.rows || 3}
                style={{
                  padding: '6px 8px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  resize: 'vertical',
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
            </div>
          );
        }

        if (field.type === 'select') {
          return (
            <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#374151',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                }}
              >
                {field.label}
              </label>
              <select
                value={state[field.name] || ''}
                onChange={handleChange(field.name)}
                style={{
                  padding: '6px 8px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  fontSize: '12px',
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
              >
                <option value="">-- Select --</option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default createNodeComponent;