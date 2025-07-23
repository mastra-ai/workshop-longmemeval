#!/usr/bin/env tsx

import { mastra, getQuestionMetadata } from '../mastra/index.js';

// Get question ID from command line
const questionId = process.argv[2];

if (!questionId) {
  console.error('Usage: tsx test-question.ts <question-id>');
  console.error('Example: tsx test-question.ts 001be529');
  process.exit(1);
}

// First get metadata to find the resourceId
const metadata = await getQuestionMetadata(questionId);

if (!metadata) {
  console.error(`Metadata for question ${questionId} not found`);
  process.exit(1);
}

const agent = mastra.getAgent(metadata.resourceId); // Use resourceId from metadata

if (!agent) {
  console.error(`Agent ${metadata.resourceId} not found`);
  const agents = mastra.getAgents();
  const availableIds = Object.keys(agents).slice(0, 10);
  console.error('Available agents:', availableIds.join(', '), '...');
  process.exit(1);
}

console.log(`\n🧪 Testing Question: ${questionId}\n`);
console.log(`Type: ${metadata.questionType}`);
console.log(`Sessions: ${metadata.sessionCount}`);
console.log(`Question: "${metadata.question}"`);
console.log(`Expected: "${metadata.answer}"`);
console.log(`Thread: ${metadata.threadIds[0]}`);
console.log();

console.log('💭 Asking the agent...\n');

const response = await agent.generate([
  { role: 'user', content: metadata.question }
], {
  threadId: metadata.threadIds[0],
  resourceId: metadata.resourceId
});

console.log('🤖 Agent Response:');
console.log(response.text);
console.log();

// Simple correctness check
const answerLower = metadata.answer.toLowerCase();
const responseLower = response.text.toLowerCase();

// More sophisticated matching for common patterns
const isCorrect = 
  responseLower.includes(answerLower) || 
  answerLower.includes(responseLower) ||
  (answerLower.includes(' ') && answerLower.split(' ').every(word => responseLower.includes(word)));

console.log('📊 Result:');
console.log(`Expected: "${metadata.answer}"`);
console.log(`Correct: ${isCorrect ? '✅ Yes' : '❌ No'}`);

if (!isCorrect) {
  console.log('\nNote: This is a simple substring match. The agent\'s answer might still be correct semantically.');
}