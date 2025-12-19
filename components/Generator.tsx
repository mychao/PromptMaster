import React, { useState, useEffect } from 'react';
import { generatePrompt } from '../services/geminiService';
import { GenerationResult } from '../types';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';

const EXAMPLES_EN = [
  "Create a Python script to scrape stock prices and visualize them using Matplotlib.",
  "Write a 7-day vegan meal plan for a high-performance athlete.",
  "Draft a cold email to a potential client selling enterprise SEO services.",
  "Explain quantum computing to a 5-year-old using simple analogies."
];

const EXAMPLES_ZH = [
  "创建一个 Python 脚本来抓取股票价格并使用 Matplotlib 进行可视化。",
  "为高性能运动员制定一份为期 7 天的纯素饮食计划。",
  "起草一封冷启动邮件给潜在客户，推销企业级 SEO 服务。",
  "用简单的类比向 5 岁的孩子解释量子计算。"
];

interface GeneratorProps {
  initialPrompt?: string;
}

const Generator: React.FC<GeneratorProps> = ({ initialPrompt }) => {
  const { t, language } = useLanguage();
  const [requirement, setRequirement] = useState(initialPrompt || '');
  const [scenario, setScenario] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentExamples = language === 'zh' ? EXAMPLES_ZH : EXAMPLES_EN;

  const SCENARIO_OPTIONS = [
    { value: 'general', label: t('scenario.option.general') },
    { value: 'rag', label: t('scenario.option.rag') },
    { value: 'code', label: t('scenario.option.code') },
    { value: 'writing', label: t('scenario.option.writing') },
    { value: 'data', label: t('scenario.option.data') },
    { value: 'persona', label: t('scenario.option.persona') },
    { value: 'prd', label: t('scenario.option.prd') },
    { value: 'hr', label: t('scenario.option.hr') },
  ];

  // Update requirement if initialPrompt changes (e.g. re-selection from Templates)
  useEffect(() => {
    if (initialPrompt) {
      setRequirement(initialPrompt);
    }
  }, [initialPrompt]);

  const handleGenerate = async () => {
    if (!requirement.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await generatePrompt(requirement, language, scenario);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during generation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          {t('gen.title')}
        </h2>
        <p className="text-slate-400">
          {t('gen.subtitle')}
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-6 shadow-xl space-y-6">
        {/* Scenario Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t('scenario.label')}
          </label>
          <div className="relative">
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-4 pr-10 py-3 text-sm text-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
            >
              {SCENARIO_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-slate-800 text-slate-200 py-2">
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <i className="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {t('gen.label')}
          </label>
          <textarea
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder={t('gen.placeholder')}
            className="w-full h-32 bg-surface border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none placeholder-slate-600"
          />

          <div className="mt-4 mb-2">
            <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">{t('gen.tryExample')}</p>
            <div className="flex flex-wrap gap-2">
              {currentExamples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setRequirement(ex)}
                  className="text-xs bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-md px-3 py-1.5 transition-all duration-200 text-left"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-700/50">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !requirement.trim()}
            className={`
              px-6 py-2.5 rounded-lg font-semibold text-white shadow-lg transition-all
              ${isLoading || !requirement.trim() 
                ? 'bg-slate-700 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-primary to-secondary hover:shadow-primary/25 hover:scale-105 active:scale-95'}
            `}
          >
            {isLoading ? t('gen.btn.generating') : t('gen.btn.generate')}
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
        <div className="space-y-6 animate-slide-up">
          {/* Main Result */}
          <div className="bg-surface rounded-2xl border border-primary/20 overflow-hidden shadow-2xl">
            <div className="bg-primary/10 p-4 border-b border-primary/10 flex justify-between items-center">
              <h3 className="font-semibold text-primary">{t('gen.result.title')}</h3>
              <button 
                onClick={() => navigator.clipboard.writeText(result.prompt)}
                className="text-xs bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1 rounded-full transition-colors"
              >
                <i className="fas fa-copy mr-1"></i> {t('gen.result.copy')}
              </button>
            </div>
            <div className="p-6 bg-[#161b22] relative group">
              <pre className="whitespace-pre-wrap font-mono text-sm text-slate-300 leading-relaxed">
                {result.prompt}
              </pre>
            </div>
          </div>

          {/* Logic & Reasoning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-secondary">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <i className="fas fa-brain text-secondary mr-2"></i> {t('gen.logic.title')}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {result.reasoning}
              </p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-accent">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <i className="fas fa-check-circle text-accent mr-2"></i> {t('gen.facts.title')}
              </h4>
              <ul className="space-y-2">
                {result.facts.map((fact, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-300">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-1.5 mr-2 flex-shrink-0"></span>
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

export default Generator;