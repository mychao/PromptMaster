import React, { useState } from 'react';
import { AppMode } from './types';
import Generator from './components/Generator';
import Optimizer from './components/Optimizer';
import Templates from './components/Templates';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.GENERATE);
  const [generatorInitialPrompt, setGeneratorInitialPrompt] = useState<string>('');
  const { t, language, setLanguage } = useLanguage();

  const handleTemplateSelect = (prompt: string) => {
    setGeneratorInitialPrompt(prompt);
    setMode(AppMode.GENERATE);
  };

  const handleNavClick = (newMode: AppMode) => {
    if (newMode === AppMode.GENERATE) {
      setGeneratorInitialPrompt('');
    }
    setMode(newMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
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
              <span className="font-bold text-lg tracking-tight text-white hidden sm:inline-block">
                PromptMaster <span className="text-primary font-light">AI</span>
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
                <button
                  onClick={() => handleNavClick(AppMode.GENERATE)}
                  className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    mode === AppMode.GENERATE 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t('nav.generator')}
                </button>
                <button
                  onClick={() => handleNavClick(AppMode.OPTIMIZE)}
                  className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    mode === AppMode.OPTIMIZE
                      ? 'bg-accent text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t('nav.optimizer')}
                </button>
                <button
                  onClick={() => handleNavClick(AppMode.TEMPLATES)}
                  className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    mode === AppMode.TEMPLATES
                      ? 'bg-teal-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t('nav.templates')}
                </button>
              </div>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="w-10 h-9 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-all"
                title="Switch Language"
              >
                <span className="font-mono text-xs font-bold">{language === 'en' ? '中' : 'EN'}</span>
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
        <p>{t('footer.text')}</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
