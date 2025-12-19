import { PromptTemplate, Language } from '../types';

const PROMPT_TEMPLATES_EN: PromptTemplate[] = [
  // Business
  {
    id: 'biz-1',
    title: 'Cold Email Outreach',
    description: 'Draft a compelling cold email to potential clients.',
    category: 'Business',
    content: 'Write a cold email to a [Job Title] at a [Industry] company. My product is [Product Name], which helps with [Problem]. The goal is to schedule a 15-minute demo call. Keep the tone professional but conversational.'
  },
  {
    id: 'biz-2',
    title: 'SWOT Analysis',
    description: 'Generate a SWOT analysis for a product or company.',
    category: 'Business',
    content: 'Perform a comprehensive SWOT analysis for [Company/Product Name], which operates in the [Industry] market. Identify internal Strengths and Weaknesses, as well as external Opportunities and Threats. Focus on competitive advantages.'
  },
  {
    id: 'biz-3',
    title: 'Meeting Minutes Summarizer',
    description: 'Structure raw notes into professional minutes.',
    category: 'Business',
    content: 'Transform the following raw meeting notes into professional Meeting Minutes. Include attendees, key discussion points, decisions made, and a table of action items with owners and deadlines. Notes: [Insert Notes Here]'
  },

  // Coding
  {
    id: 'code-1',
    title: 'Code Review Assistant',
    description: 'Analyze code for bugs, style, and performance.',
    category: 'Coding',
    content: 'Act as a Senior Software Engineer. Review the following [Language] code. Identify potential bugs, security vulnerabilities, and performance bottlenecks. Suggest refactoring for better readability and adherence to clean code principles.'
  },
  {
    id: 'code-2',
    title: 'Unit Test Generator',
    description: 'Create comprehensive unit tests for a function.',
    category: 'Coding',
    content: 'Write a comprehensive suite of unit tests for the following code using [Test Framework]. Include positive cases, edge cases, and error handling scenarios. Explain the coverage strategy.'
  },
  {
    id: 'code-3',
    title: 'Documentation Generator',
    description: 'Generate technical documentation for code.',
    category: 'Coding',
    content: 'Generate detailed technical documentation for the following code snippet. Include a summary, parameter descriptions, return values, and an example usage scenario. Use Markdown format.'
  },

  // Writing
  {
    id: 'write-1',
    title: 'Blog Post Outline',
    description: 'Create a structured outline for a blog post.',
    category: 'Writing',
    content: 'Create a detailed SEO-optimized blog post outline for the topic: "[Topic]". The target audience is [Audience]. Include a catchy title, H2 headings, H3 subheadings, and bullet points for key concepts under each section.'
  },
  {
    id: 'write-2',
    title: 'Story Character Profile',
    description: 'Flesh out a character for a novel or screenplay.',
    category: 'Writing',
    content: 'Create a detailed character profile for a [Genre] story. The character is a [Role/Archetype]. Include their name, age, physical appearance, backstory, core motivation, internal conflict, and a unique quirk.'
  },
  {
    id: 'write-3',
    title: 'Text Simplifier',
    description: 'Rewrite complex text for a general audience.',
    category: 'Writing',
    content: 'Rewrite the following text to be easily understood by a 5th grader. Remove jargon, simplify sentence structures, and use analogies where appropriate. Original text: [Insert Text]'
  },

  // Marketing
  {
    id: 'mkt-1',
    title: 'Social Media Calendar',
    description: 'Plan a week of content for social platforms.',
    category: 'Marketing',
    content: 'Create a 1-week social media content calendar for [Brand Name] on [Platform]. The goal is to [Goal, e.g., increase engagement]. Include post ideas, captions, suggested hashtags, and visual descriptions for each day.'
  },
  {
    id: 'mkt-2',
    title: 'Ad Copy Generator',
    description: 'Write catchy ad copy for different formats.',
    category: 'Marketing',
    content: 'Write 3 variations of ad copy for [Product] targeting [Audience]. 1. A short, punchy headline. 2. A medium-length description focusing on benefits. 3. A storytelling-based long-form copy. Highlight the USP: [Unique Selling Point].'
  },
  
  // Education
  {
    id: 'edu-1',
    title: 'Socratic Tutor',
    description: 'A prompt to act as a guide rather than giving answers.',
    category: 'Education',
    content: 'Act as a Socratic Tutor. I want to learn about [Topic]. Do not give me the answers directly. Instead, ask guiding questions to help me discover the answers myself. Adjust your questioning based on my responses.'
  },
  {
    id: 'edu-2',
    title: 'Complex Concept Analogy',
    description: 'Explain difficult concepts using simple analogies.',
    category: 'Education',
    content: 'Explain the concept of [Complex Topic] using a real-world analogy involving [Everyday Object/Scenario]. Break it down into simple steps and explain how the analogy maps to the technical details.'
  }
];

const PROMPT_TEMPLATES_ZH: PromptTemplate[] = [
  // Business
  {
    id: 'biz-1-zh',
    title: '冷启动邮件 (Cold Email)',
    description: '给潜在客户起草一封引人注目的开发邮件。',
    category: 'Business',
    content: '给[行业]公司的[职位]写一封开发邮件。我的产品是[产品名称]，它可以帮助解决[问题]。目标是安排一次15分钟的演示电话。保持语气专业但像聊天一样自然。'
  },
  {
    id: 'biz-2-zh',
    title: 'SWOT 分析',
    description: '为产品或公司生成 SWOT 分析。',
    category: 'Business',
    content: '对在[行业]市场运营的[公司/产品名称]进行全面的SWOT分析。确定内部的优势和劣势，以及外部的机会和威胁。重点关注竞争优势。'
  },
  {
    id: 'biz-3-zh',
    title: '会议纪要总结',
    description: '将原始笔记整理成专业的会议纪要。',
    category: 'Business',
    content: '将以下原始会议笔记转换为专业的会议纪要。包括与会者、关键讨论点、做出的决定，以及带有负责人和截止日期的行动项表格。笔记：[在此插入笔记]'
  },

  // Coding
  {
    id: 'code-1-zh',
    title: '代码审查助手',
    description: '分析代码的错误、风格和性能。',
    category: 'Coding',
    content: '扮演一名高级软件工程师。审查以下[语言]代码。识别潜在的错误、安全漏洞和性能瓶颈。建议重构以提高可读性并遵守代码整洁原则。'
  },
  {
    id: 'code-2-zh',
    title: '单元测试生成器',
    description: '为函数创建全面的单元测试。',
    category: 'Coding',
    content: '使用[测试框架]为以下代码编写一套全面的单元测试。包括正向用例、边界用例和错误处理场景。解释测试覆盖策略。'
  },
  {
    id: 'code-3-zh',
    title: '文档生成器',
    description: '生成代码的技术文档。',
    category: 'Coding',
    content: '为以下代码片段生成详细的技术文档。包括摘要、参数说明、返回值和示例使用场景。使用 Markdown 格式。'
  },

  // Writing
  {
    id: 'write-1-zh',
    title: '博客文章大纲',
    description: '为博客文章创建结构化大纲。',
    category: 'Writing',
    content: '为主题“[主题]”创建一个详细的 SEO 优化博客文章大纲。目标受众是[受众]。包括一个吸引人的标题、H2 标题、H3 子标题，以及每个部分下的关键概念要点。'
  },
  {
    id: 'write-2-zh',
    title: '故事角色档案',
    description: '为小说或剧本充实角色。',
    category: 'Writing',
    content: '为[类型]故事创建一个详细的角色档案。该角色是[角色/原型]。包括他们的姓名、年龄、外貌、背景故事、核心动机、内部冲突和一个独特的怪癖。'
  },
  {
    id: 'write-3-zh',
    title: '文本简化器',
    description: '为普通读者重写复杂文本。',
    category: 'Writing',
    content: '重写以下文本，使其容易被五年级学生理解。去除行话，简化句子结构，并在适当的地方使用类比。原始文本：[在此插入文本]'
  },

  // Marketing
  {
    id: 'mkt-1-zh',
    title: '社交媒体日历',
    description: '规划一周的社交平台内容。',
    category: 'Marketing',
    content: '为[品牌名称]在[平台]上创建一个为期 1 周的社交媒体内容日历。目标是[目标，例如，增加互动]。包括每天的帖子创意、文案、建议的主题标签和视觉描述。'
  },
  {
    id: 'mkt-2-zh',
    title: '广告文案生成器',
    description: '为不同格式编写吸引人的广告文案。',
    category: 'Marketing',
    content: '针对[受众]为[产品]编写 3 种变体的广告文案。1. 一个简短有力的标题。2. 一个侧重于好处的中等长度描述。3. 一个基于故事的长篇文案。突出独特的卖点 (USP)：[独特卖点]。'
  },
  
  // Education
  {
    id: 'edu-1-zh',
    title: '苏格拉底式导师',
    description: '扮演引导者而不是直接给出答案。',
    category: 'Education',
    content: '扮演苏格拉底式导师。我想学习[主题]。不要直接给我答案。相反，提出引导性问题帮助我自己发现答案。根据我的回答调整你的提问。'
  },
  {
    id: 'edu-2-zh',
    title: '复杂概念类比',
    description: '使用简单的类比解释困难的概念。',
    category: 'Education',
    content: '使用涉及[日常物体/场景]的现实世界类比来解释[复杂主题]的概念。将其分解为简单的步骤，并解释类比如何映射到技术细节。'
  }
];

export const getTemplates = (language: Language): PromptTemplate[] => {
  return language === 'zh' ? PROMPT_TEMPLATES_ZH : PROMPT_TEMPLATES_EN;
};
