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

// Configure memory to work across conversations
const memory = new Memory({
  storage,
  vector: vectorStore,
  embedder: openai.embedding("text-embedding-3-small"),
  options: {
    lastMessages: 10,

    // Resource-scoped working memory persists across all user conversations
    workingMemory: {
      enabled: true,
      scope: "resource", // Key difference: remembers across threads
    },

    // Resource-scoped semantic recall searches all user conversations
    semanticRecall: {
      topK: 5,
      messageRange: 3,
      scope: "resource", // Searches across all threads
    },
  },
});

export const personalAssistant = new Agent({
  name: "personal-assistant",
  model: openai("gpt-4o-mini"),
  memory,
  instructions: `You are a personal assistant that remembers users across all conversations.

Key behaviors:
- Remember user preferences, habits, and personal information across all interactions
- Reference past conversations naturally when relevant
- Update your knowledge when users share new or changed information
- Provide personalized responses based on what you know about the user
- If you remember something specific about the user, mention it to show continuity

You maintain a continuous relationship with each user across all their conversation threads.`,
});

