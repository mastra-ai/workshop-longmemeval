# Example 1: Basic Memory Setup

This example demonstrates the simplest way to add memory to a Mastra agent.

## What You'll Learn

- How to set up memory storage with LibSQL
- Configuring working memory and semantic recall
- How agents remember information across messages
- The difference between thread-scoped and resource-scoped memory

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Copy the environment file:
```bash
cp .env.example .env
```

3. Add your OpenAI API key to `.env`

## Running the Example

```bash
pnpm dev
```

## How It Works

1. **Storage**: Uses LibSQL (SQLite) to store conversation history locally
2. **Working Memory**: Enabled to store persistent information about the user
3. **Semantic Recall**: Retrieves the 3 most relevant past messages when needed
4. **Thread Scope**: Memory is isolated to each conversation thread

## Key Configuration

```typescript
const memory = new Memory({
  storage,
  options: {
    lastMessages: 10,        // Keep recent messages in context
    workingMemory: { 
      enabled: true          // Store persistent facts
    },
    semanticRecall: {
      topK: 3,              // Find 3 most relevant messages
      messageRange: 2,      // Include surrounding context
      scope: 'thread'       // Search within this thread only
    }
  }
});
```

## Next Steps

- Try modifying the `topK` value to retrieve more relevant messages
- Change the scope to `'resource'` for cross-conversation memory
- Add a custom working memory template for structured data