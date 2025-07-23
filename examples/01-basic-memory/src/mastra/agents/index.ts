import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";

import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { LibSQLVector } from "@mastra/libsql";

const base = process.env.DB_BASE || "../../";
// Path is relative to .mastra/output/ when bundled
const storage = new LibSQLStore({
  url: `file:${base}memory.db`,
});

// Initialize vector store for semantic search
const vectorStore = new LibSQLVector({
  connectionUrl: `file:${base}memory.db`,
});

// Create memory with basic configuration
const memory = new Memory({
  storage,
  vector: vectorStore,
  embedder: openai.embedding("text-embedding-3-small"),
  options: {
    // Keep last 10 messages in context
    lastMessages: 10,

    // Enable working memory for persistent info
    workingMemory: { enabled: true },

    // Enable semantic recall for finding relevant past messages
    semanticRecall: {
      topK: 3, // Retrieve top 3 relevant messages
      messageRange: 2, // Include 2 messages before/after for context
    },
  },
});

export const memoryAgent = new Agent({
  name: "memory-assistant",
  model: openai("gpt-4o-mini"),
  memory,
  instructions: `You are a helpful assistant with memory capabilities.
  
You can remember information from our conversations and recall it later.
When users share information about themselves, acknowledge that you'll remember it.
When asked about something from a previous conversation, check your memory and provide accurate information.`,
});
