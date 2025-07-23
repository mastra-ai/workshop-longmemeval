import { Mastra } from '@mastra/core';
import { Agent } from '@mastra/core/agent';
import { createQuestionAgent } from './agents/factory.js';
import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Build all LongMemEval agents with isolated memory
async function buildAgents(): Promise<Mastra> {
  // When running with mastra dev, paths are relative to .mastra/output/
  const dataPath = join(__dirname, '..', '..', 'src', 'data', 'longmemeval_s-semantic-recall');
  
  // Get all question IDs
  const questionIds = await readdir(dataPath);
  const validQuestionIds = questionIds.filter(id => !id.includes('_abs') && !id.startsWith('.')) // Skip abstention variants and hidden files
    .slice(0, 50); // Only load first x for debugging
    // .slice(400, 450); // Only load first x for debugging
  
  console.log(`Loading ${validQuestionIds.length} LongMemEval questions...`);
  console.log(`First question ID: ${validQuestionIds[0]}`);
  
  const agents: Record<string, Agent> = {};
  
  // Create agents in batches to avoid memory issues
  const batchSize = 50;
  for (let i = 0; i < validQuestionIds.length; i += batchSize) {
    const batch = validQuestionIds.slice(i, i + batchSize);
    
    await Promise.all(batch.map(async (questionId) => {
      try {
        const { agent } = await createQuestionAgent(questionId, dataPath);
        // Agent name is now the resourceId (e.g., resource_001be529)
        agents[agent.name] = agent;
      } catch (error) {
        console.error(`Failed to load question ${questionId}:`, error);
      }
    }));
    
    console.log(`Loaded ${Math.min(i + batchSize, validQuestionIds.length)}/${validQuestionIds.length} questions`);
  }
  
  // Create Mastra instance
  // Each agent already has its own memory configured
  const mastra = new Mastra({
    agents
  });
  
  console.log(`\n✅ Loaded ${Object.keys(agents).length} LongMemEval agents`);
  console.log('Each agent has isolated memory with pre-loaded conversation history.');
  
  return mastra;
}

// Export the built instance
export const mastra = await buildAgents();

// Helper to get metadata for a question
export async function getQuestionMetadata(questionId: string) {
  const dataPath = join(__dirname, '..', '..', 'src', 'data', 'longmemeval_s-semantic-recall');
  const metaPath = join(dataPath, questionId, 'meta.json');
  try {
    const content = await readFile(metaPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}
