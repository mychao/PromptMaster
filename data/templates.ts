import { PromptTemplate } from '../types';

export const PROMPT_TEMPLATES: PromptTemplate[] = [
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
