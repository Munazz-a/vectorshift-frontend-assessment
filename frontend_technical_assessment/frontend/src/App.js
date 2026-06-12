// app.js
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Toolbar */}
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <PipelineToolbar />
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden">
        <PipelineUI />
      </div>

      {/* Submit Button */}
      <div className="border-t border-slate-200 bg-white shadow-lg">
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
