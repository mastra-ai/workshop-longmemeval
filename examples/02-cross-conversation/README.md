# Example 2: Cross-Conversation Memory

This example demonstrates how agents can remember users across different conversation threads using resource-scoped memory.

## What You'll Learn

- The difference between thread-scoped and resource-scoped memory
- How to link conversations to a specific user with `resourceId`
- Implementing persistent user profiles across sessions
- Building agents that maintain long-term relationships

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

The key difference from Example 1 is the memory scope:

```typescript
workingMemory: { 
  enabled: true,
  scope: 'resource'  // Persists across all conversations
},
semanticRecall: {
  scope: 'resource'  // Searches all user threads
}
```

By using `resourceId` when generating responses, all conversations are linked to the same user:

```typescript
await agent.generate(messages, {
  threadId: 'thread-1',
  resourceId: 'user-123'  // Links memory to this user
});
```

## Use Cases

- Personal assistants that remember user preferences
- Customer support agents with conversation history
- Educational tutors tracking student progress
- Any application requiring persistent user context

## Next Steps

- Try implementing user preferences that evolve over time
- Add structured data to working memory
- Experiment with different `topK` values for semantic recall