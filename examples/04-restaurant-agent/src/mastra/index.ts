import { Mastra } from '@mastra/core';
import { restaurantBuddy } from './agents/index.js';

export const mastra = new Mastra({
  agents: { restaurantBuddy }
});