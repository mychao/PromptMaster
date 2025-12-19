import React, { useState } from 'react';
import { PROMPT_TEMPLATES } from '../data/templates';
import { PromptTemplate } from '../types';

interface TemplatesProps {
  onSelect: (content: string) => void;
}

const CATEGORIES = ['All', 'Business', 'Coding', 'Writing', 'Marketing', 'Education'];

const Templates: React.FC<TemplatesProps> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = PROMPT_TEMPLATES.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Business': return 'fa-briefcase';
      case 'Coding': return 'fa-code';
      case 'Writing': return 'fa-feather-pointed';
      case 'Marketing': return 'fa-bullhorn';
      case 'Education': return 'fa-graduation-cap';
      default: return 'fa-layer-group';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-4 text-center sm:text-left">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
          Prompt Templates
        </h2>
        <p className="text-slate-400">
          Browse categorized templates to jumpstart your prompt engineering process.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center glass-panel p-4 rounded-xl">
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                ${selectedCategory === cat 
                  ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-teal-300 border border-teal-500/50 shadow-lg shadow-teal-500/10' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
          <input 
            type="text" 
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-teal-500/50 focus:border-transparent outline-none placeholder-slate-600 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <div 
            key={template.id}
            className="group bg-surface border border-slate-700/50 rounded-xl p-6 hover:border-teal-500/30 hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-700 group-hover:border-teal-500/30 transition-colors">
                <i className={`fas ${getCategoryIcon(template.category)} text-slate-400 group-hover:text-teal-400`}></i>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                {template.category}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-200 mb-2 group-hover:text-teal-300 transition-colors">
              {template.title}
            </h3>
            <p className="text-sm text-slate-400 mb-6 flex-grow">
              {template.description}
            </p>

            <div className="mt-auto pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-500 mb-3 line-clamp-2 font-mono bg-slate-950/50 p-2 rounded">
                    {template.content}
                </p>
                <button
                onClick={() => onSelect(template.content)}
                className="w-full py-2 rounded-lg bg-slate-800 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 font-medium text-sm transition-all border border-slate-700 hover:border-teal-500/30 flex items-center justify-center"
                >
                <i className="fas fa-pen-fancy mr-2"></i> Use Template
                </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <i className="fas fa-inbox text-4xl mb-4 opacity-30"></i>
          <p>No templates found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
