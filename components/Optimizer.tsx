import React, { useState, useRef } from 'react';
import { optimizePrompt } from '../services/geminiService';
import { OptimizationResult, FileInput } from '../types';
import { LoadingSpinner } from './ui/LoadingSpinner';

const EXAMPLES = [
  "Write a story about a brave knight in a kingdom.",
  "Help me fix this Python code because it is not working.",
  "Give me 5 blog post ideas for my marketing agency.",
  "Translate the following business text into professional Spanish."
];

interface HistoryItem {
  result: OptimizationResult;
  timestamp: number;
}

const Optimizer: React.FC = () => {
  const [textInput, setTextInput] = useState('');
  const [fileInput, setFileInput] = useState<FileInput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  
  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  
  const fileRef = useRef<HTMLInputElement>(null);

  // Derived state
  const currentItem = currentIndex >= 0 && currentIndex < history.length ? history[currentIndex] : null;
  const result = currentItem?.result || null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert("File too large. Please upload a file smaller than 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      setFileInput({
        name: file.name,
        mimeType: file.type,
        data: base64String
      });
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setFileInput(undefined);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleOptimize = async () => {
    if (!textInput.trim() && !fileInput) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await optimizePrompt(textInput, fileInput);
      setHistory(prev => {
        const next = [...prev, { result: data, timestamp: Date.now() }];
        return next;
      });
      // Set index to the new last element
      setCurrentIndex(history.length);
    } catch (err: any) {
      setError(err.message || 'An error occurred during optimization.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your optimization history?")) {
      setHistory([]);
      setCurrentIndex(-1);
    }
  };

  const navigateHistory = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next' && currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-4 text-center sm:text-left">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">
          Prompt Optimizer
        </h2>
        <p className="text-slate-400">
          Refine your existing prompts using advanced rhetorical analysis and structural optimization.
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-6 shadow-xl space-y-6">
        {/* Input Area */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Paste your prompt here
          </label>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Paste the prompt you want to improve..."
            className="w-full h-32 bg-surface border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none placeholder-slate-600"
          />

          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Load example prompt</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setTextInput(ex)}
                  className="text-xs bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-md px-3 py-1.5 transition-all duration-200"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-700/50 pt-4">
          <div className="flex items-center space-x-4">
            <input
              type="file"
              ref={fileRef}
              onChange={handleFileChange}
              accept=".txt,.md,.pdf"
              className="hidden"
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center mr-2 border border-slate-700">
                <i className="fas fa-paperclip"></i>
              </div>
              <span>Upload PDF, MD, or TXT</span>
            </button>
            
            {fileInput && (
              <div className="flex items-center bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="text-xs text-white truncate max-w-[150px]">{fileInput.name}</span>
                <button onClick={removeFile} className="ml-2 text-slate-400 hover:text-red-400">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleOptimize}
            disabled={isLoading || (!textInput.trim() && !fileInput)}
            className={`
              px-6 py-2.5 rounded-lg font-semibold text-white shadow-lg transition-all
              ${isLoading || (!textInput.trim() && !fileInput)
                ? 'bg-slate-700 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-accent to-secondary hover:shadow-accent/25 hover:scale-105 active:scale-95'}
            `}
          >
            {isLoading ? 'Analyzing...' : 'Optimize Prompt'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
          {error}
        </div>
      )}

      {isLoading && <LoadingSpinner />}

      {result && !isLoading && (
        <div className="space-y-8 animate-slide-up">
          
          {/* Comparison View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Original Prompt Column */}
            <div className="flex flex-col h-full bg-surface rounded-2xl border border-slate-700/60 overflow-hidden shadow-lg">
              <div className="bg-slate-800/80 p-4 border-b border-slate-700/60 flex items-center justify-between">
                <h3 className="font-semibold text-slate-400 flex items-center">
                  <i className="fas fa-history mr-2 text-slate-500"></i>
                  Original Input
                </h3>
                {fileInput && (
                  <span className="text-xs bg-slate-700/80 text-slate-300 px-2.5 py-1 rounded-full border border-slate-600 flex items-center">
                    <i className="fas fa-file-alt mr-1.5 text-slate-400"></i> 
                    {fileInput.name}
                  </span>
                )}
              </div>
              <div className="p-6 bg-[#0d1117] flex-grow overflow-auto max-h-[600px]">
                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-400 leading-relaxed opacity-80">
                  {textInput.trim() || (fileInput ? "Content provided via file upload." : "No text input provided.")}
                </pre>
              </div>
            </div>

            {/* Optimized Prompt Column */}
            <div className="flex flex-col h-full bg-surface rounded-2xl border border-accent/30 overflow-hidden shadow-2xl shadow-accent/5">
              <div className="bg-accent/10 p-4 border-b border-accent/10 flex flex-col sm:flex-row justify-between items-center relative gap-4">
                 <div className="flex items-center gap-4">
                   <h3 className="font-semibold text-accent flex items-center">
                     <i className="fas fa-wand-magic-sparkles mr-2"></i>
                     Optimized
                   </h3>
                   
                   {/* History Controls */}
                   {history.length > 1 && (
                     <div className="flex items-center bg-slate-900/50 rounded-lg p-0.5 border border-accent/20">
                       <button 
                         onClick={() => navigateHistory('prev')}
                         disabled={currentIndex === 0}
                         className="p-1.5 px-2.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                         title="Previous Version"
                       >
                         <i className="fas fa-chevron-left text-xs"></i>
                       </button>
                       <span className="text-[10px] font-mono font-medium text-slate-300 px-2 border-x border-slate-700/50">
                         v{currentIndex + 1}/{history.length}
                       </span>
                       <button 
                         onClick={() => navigateHistory('next')}
                         disabled={currentIndex === history.length - 1}
                         className="p-1.5 px-2.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                         title="Next Version"
                       >
                         <i className="fas fa-chevron-right text-xs"></i>
                       </button>
                     </div>
                   )}
                 </div>

                 <div className="flex items-center gap-3">
                    <span className={`
                        hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border
                        ${result.improvementType === 'clarity' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                        ${result.improvementType === 'structure' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : ''}
                        ${result.improvementType === 'constraints' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                        ${result.improvementType === 'context' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                    `}>
                      {result.improvementType}
                    </span>
                    <button 
                      onClick={() => navigator.clipboard.writeText(result.prompt)}
                      className="text-xs bg-accent/20 hover:bg-accent/30 text-accent px-3 py-1.5 rounded-full transition-colors flex items-center"
                    >
                      <i className="fas fa-copy mr-1.5"></i> Copy
                    </button>
                    {history.length > 0 && (
                      <button 
                        onClick={handleClearHistory}
                        className="text-xs bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 px-2 py-1.5 rounded-lg transition-colors ml-1 border border-slate-700 hover:border-red-500/30"
                        title="Clear History"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    )}
                 </div>
              </div>
              <div className="p-6 bg-[#161b22] flex-grow overflow-auto max-h-[600px] relative group">
                <div className="absolute top-2 right-2 text-[10px] text-slate-600 font-mono">
                  {new Date(currentItem?.timestamp || 0).toLocaleTimeString()}
                </div>
                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-200 leading-relaxed selection:bg-accent/30 selection:text-white">
                  {result.prompt}
                </pre>
              </div>
            </div>
          </div>

          {/* Logic & Reasoning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-primary">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <i className="fas fa-microscope text-primary mr-2"></i> Optimization Logic
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {result.reasoning}
              </p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-green-500">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <i className="fas fa-tree text-green-500 mr-2"></i> Why this works
              </h4>
              <ul className="space-y-2">
                {result.facts.map((fact, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-300">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2 flex-shrink-0"></span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Optimizer;