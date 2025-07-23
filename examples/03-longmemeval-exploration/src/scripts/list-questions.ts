#!/usr/bin/env tsx

import { mastra, getQuestionMetadata } from '../mastra/index.js';
import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Group questions by type
const questionsByType = new Map<string, any[]>();

// Get all agents
const agents = mastra.getAgents();
const totalQuestions = Object.keys(agents).length;

// Process each agent
for (const agentName in agents) {
  // Agent name is now the resourceId (e.g., resource_001be529)
  // Extract questionId from it
  const questionId = agentName.replace('resource_', '');
  const metadata = await getQuestionMetadata(questionId);
  
  if (metadata) {
    const type = metadata.questionType;
    if (!questionsByType.has(type)) {
      questionsByType.set(type, []);
    }
    questionsByType.get(type)!.push({
      id: metadata.questionId,
      question: metadata.question,
      answer: metadata.answer,
      sessions: metadata.sessionCount
    });
  }
}

console.log('📋 LongMemEval Questions by Type\n');

// Show summary
console.log('📊 Summary:');
for (const [type, questions] of questionsByType) {
  console.log(`  ${type}: ${questions.length} questions`);
}
console.log(`  Total: ${totalQuestions} questions\n`);

// Show questions by type
for (const [type, questions] of questionsByType) {
  console.log(`\n${type.toUpperCase()}\n${'='.repeat(type.length)}`);
  
  // Sort by session count for easier navigation
  questions.sort((a, b) => a.sessions - b.sessions);
  
  // Show first 5 questions of each type
  const sample = questions.slice(0, 5);
  
  for (const q of sample) {
    console.log(`\nID: ${q.id}`);
    console.log(`Sessions: ${q.sessions}`);
    console.log(`Q: "${q.question}"`);
    console.log(`A: "${q.answer}"`);
  }
  
  if (questions.length > 5) {
    console.log(`\n... and ${questions.length - 5} more ${type} questions`);
  }
}

console.log('\n\n💡 To test a specific question, run:');
console.log('   tsx scripts/test-question.ts <question-id>');
console.log('   Example: tsx scripts/test-question.ts 001be529');