// submit.js

// frontend/src/submit.js
// Updated for Part 4: Send pipeline to backend for validation

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
  const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
  });

  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      alert('❌ Error: Please add at least one node to the pipeline');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: nodes,
          edges: edges,
        }),
      });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const dagStatus = data.is_dag ? '✓ Valid DAG' : '✗ Cycle Detected';
      const message = `
Pipeline Analysis
━━━━━━━━━━━━━━━
Nodes: ${data.num_nodes}
Edges: ${data.num_edges}
DAG Status: ${dagStatus}
━━━━━━━━━━━━━━━
      `.trim();

      alert(message);
      console.log('Backend Response:', data);
    } catch (error) {
      console.error('Error:', error);
      alert(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center p-lg">
      <button
        onClick={handleSubmit}
        className={`
          px-8 py-3
          text-base font-semibold
          bg-accent-success hover:bg-navy-600
          active:bg-navy-600
          text-white
          border border-green-700
          rounded-base
          cursor-pointer
          transition-all duration-200
          shadow-md hover:shadow-lg
          select-none
        `}
      >
        Submit Pipeline
      </button>
    </div>
  );
};