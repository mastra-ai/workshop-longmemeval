import { Mastra } from '@mastra/core';
import { memoryAgent } from './agents/index.js';

export const mastra = new Mastra({
  agents: { memoryAgent }
});
