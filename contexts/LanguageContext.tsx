import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.generator': 'Generator',
    'nav.optimizer': 'Optimizer',
    'nav.templates': 'Templates',
    'footer.text': 'Powered by Google Gemini 3',
    
    // Scenario
    'scenario.label': 'Target Scenario / Context',
    'scenario.placeholder': 'Select a scenario...',
    'scenario.option.general': 'General Purpose',
    'scenario.option.rag': 'RAG Knowledge Base (QA)',
    'scenario.option.code': 'Code Generation & Review',
    'scenario.option.writing': 'Creative Writing & Storytelling',
    'scenario.option.data': 'Data Analysis & Insights',
    'scenario.option.persona': 'Persona Simulation (Roleplay)',
    'scenario.option.prd': 'Product Requirements (PRD)',
    'scenario.option.hr': 'HR & Corporate Policy',

    // Generator
    'gen.title': 'Prompt Generator',
    'gen.subtitle': 'Transform your rough ideas into professional, high-performance prompts tailored for advanced LLMs.',
    'gen.label': 'Describe your requirement',
    'gen.placeholder': 'E.g., I need a prompt to help me write a sci-fi novel about time travel, focusing on character development...',
    'gen.tryExample': 'Try an example',
    'gen.btn.generate': 'Generate Prompt',
    'gen.btn.generating': 'Crafting Prompt...',
    'gen.result.title': 'Generated Prompt',
    'gen.result.copy': 'Copy',
    'gen.logic.title': 'Generation Logic',
    'gen.facts.title': 'Key Facts & Principles',

    // Optimizer
    'opt.title': 'Prompt Optimizer',
    'opt.subtitle': 'Refine your existing prompts using advanced rhetorical analysis and structural optimization.',
    'opt.label': 'Paste your prompt here',
    'opt.placeholder': 'Paste the prompt you want to improve...',
    'opt.loadExample': 'Load example prompt',
    'opt.upload': 'Upload PDF, MD, or TXT',
    'opt.btn.optimize': 'Optimize Prompt',
    'opt.btn.analyzing': 'Analyzing...',
    'opt.col.original': 'Original Input',
    'opt.col.optimized': 'Optimized',
    'opt.logic.title': 'Optimization Logic',
    'opt.why.title': 'Why this works',
    'opt.file.content': 'Content provided via file upload.',
    'opt.noInput': 'No text input provided.',
    'opt.clearHistory': 'Clear History',
    'opt.clearConfirm': 'Are you sure you want to clear your optimization history?',
    'opt.improved': 'Improved',

    // Templates
    'temp.title': 'Prompt Templates',
    'temp.subtitle': 'Browse categorized templates to jumpstart your prompt engineering process.',
    'temp.search': 'Search templates...',
    'temp.use': 'Use Template',
    'temp.cat.All': 'All',
    'temp.cat.Business': 'Business',
    'temp.cat.Coding': 'Coding',
    'temp.cat.Writing': 'Writing',
    'temp.cat.Marketing': 'Marketing',
    'temp.cat.Education': 'Education',
    'temp.noResults': 'No templates found matching your criteria.',
  },
  zh: {
    // Nav
    'nav.generator': '生成器',
    'nav.optimizer': '优化器',
    'nav.templates': '模板库',
    'footer.text': '由 Google Gemini 3 驱动',

    // Scenario
    'scenario.label': '目标场景 / 上下文',
    'scenario.placeholder': '选择一个场景...',
    'scenario.option.general': '通用场景',
    'scenario.option.rag': 'RAG 知识库问答',
    'scenario.option.code': '代码生成与审查',
    'scenario.option.writing': '创意写作与故事创作',
    'scenario.option.data': '数据分析与洞察',
    'scenario.option.persona': '角色扮演 (Persona)',
    'scenario.option.prd': '产品需求文档 (PRD)',
    'scenario.option.hr': '员工手册与规章制度',

    // Generator
    'gen.title': '提示词生成器',
    'gen.subtitle': '将您的粗略想法转化为专为高级 LLM 量身定制的专业、高性能提示词。',
    'gen.label': '描述您的需求',
    'gen.placeholder': '例如：我需要一个提示词来帮助我写一部关于时间旅行的科幻小说，重点关注角色发展...',
    'gen.tryExample': '尝试示例',
    'gen.btn.generate': '生成提示词',
    'gen.btn.generating': '正在精心制作...',
    'gen.result.title': '生成的提示词',
    'gen.result.copy': '复制',
    'gen.logic.title': '生成逻辑',
    'gen.facts.title': '关键事实与原则',

    // Optimizer
    'opt.title': '提示词优化器',
    'opt.subtitle': '利用高级修辞分析和结构优化技术，打磨您现有的提示词。',
    'opt.label': '在此粘贴您的提示词',
    'opt.placeholder': '粘贴您想要改进的提示词...',
    'opt.loadExample': '加载示例提示词',
    'opt.upload': '上传 PDF, MD 或 TXT',
    'opt.btn.optimize': '优化提示词',
    'opt.btn.analyzing': '正在分析...',
    'opt.col.original': '原始输入',
    'opt.col.optimized': '优化后',
    'opt.logic.title': '优化逻辑',
    'opt.why.title': '优化原理',
    'opt.file.content': '内容通过文件上传提供。',
    'opt.noInput': '未提供文本输入。',
    'opt.clearHistory': '清除历史记录',
    'opt.clearConfirm': '确定要清除您的优化历史记录吗？',
    'opt.improved': '改进点',

    // Templates
    'temp.title': '提示词模板',
    'temp.subtitle': '浏览分类模板，快速开始您的提示词工程。',
    'temp.search': '搜索模板...',
    'temp.use': '使用模板',
    'temp.cat.All': '全部',
    'temp.cat.Business': '商业',
    'temp.cat.Coding': '编程',
    'temp.cat.Writing': '写作',
    'temp.cat.Marketing': '营销',
    'temp.cat.Education': '教育',
    'temp.noResults': '未找到匹配的模板。',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};