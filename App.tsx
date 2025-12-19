import React, { useState } from 'react';
import { AppMode } from './types';
import Generator from './components/Generator';
import Optimizer from './components/Optimizer';
import Templates from './components/Templates';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.GENERATE);
  const [generatorInitialPrompt, setGeneratorInitialPrompt] = useState<string>('');

  const handleTemplateSelect = (prompt: string) => {
    setGeneratorInitialPrompt(prompt);
    setMode(AppMode.GENERATE);
  };

  const handleNavClick = (newMode: AppMode) => {
    // If navigating to Generator manually, clear the initial prompt so it's fresh
    // unless we are just toggling back and forth? Let's clear it to avoid confusion.
    if (newMode === AppMode.GENERATE) {
      setGeneratorInitialPrompt('');
    }
    setMode(newMode);
  };

  return (
    <div className="min-h-screen bg-background text-slate-200 selection:bg-primary/30 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick(AppMode.GENERATE)}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <i className="fas fa-magic text-white text-sm"></i>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                PromptMaster <span className="text-primary font-light">AI</span>
              </span>
            </div>
            
            <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
              <button
                onClick={() => handleNavClick(AppMode.GENERATE)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  mode === AppMode.GENERATE 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Generator
              </button>
              <button
                onClick={() => handleNavClick(AppMode.OPTIMIZE)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  mode === AppMode.OPTIMIZE
                    ? 'bg-accent text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Optimizer
              </button>
              <button
                onClick={() => handleNavClick(AppMode.TEMPLATES)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  mode === AppMode.TEMPLATES
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Templates
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="transition-all duration-300">
          {mode === AppMode.GENERATE && (
            <Generator initialPrompt={generatorInitialPrompt} />
          )}
          {mode === AppMode.OPTIMIZE && (
            <Optimizer />
          )}
          {mode === AppMode.TEMPLATES && (
            <Templates onSelect={handleTemplateSelect} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm">
        <p>Powered by Google Gemini 3</p>
      </footer>
    </div>
  );
};

export default App;
