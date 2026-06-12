// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="p-lg flex items-center gap-lg">
      {/* Toolbar Label */}
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        Nodes
      </div>

      {/* Node Buttons */}
      <div className="flex flex-wrap gap-md">
        <DraggableNode type="input" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="output" label="Output" />
        <DraggableNode type="text" label="Text" />
      </div>
    </div>
  );
};