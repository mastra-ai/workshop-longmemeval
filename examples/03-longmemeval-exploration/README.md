# Example 3: LongMemEval Exploration

An interactive exploration of 500 real benchmark questions from LongMemEval, the academic benchmark for testing long-term memory in AI assistants.

## What is LongMemEval?

LongMemEval is a comprehensive benchmark from ICLR 2025 that evaluates five core memory abilities:

1. **Information Extraction** - Recalling specific facts from extensive conversation histories
2. **Multi-Session Reasoning** - Connecting information across multiple conversations
3. **Temporal Reasoning** - Understanding time-based relationships ("what happened before/after")
4. **Knowledge Updates** - Handling information that changes over time
5. **Abstention** - Knowing when information is not available

## What Makes This Example Special

- **500 Real Questions**: Actual benchmark data, not synthetic examples
- **Isolated Memory**: Each agent has its own storage and vector store
- **Pre-loaded History**: Conversation histories are loaded from the benchmark dataset
- **In-Memory Storage**: No external dependencies - uses custom storage adapters
- **Playground Compatible**: Explore all 500 questions interactively

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Add your OpenAI API key to `.env`

## Usage

### Quick Demo
```bash
pnpm dev
```

Shows question distribution and tests a sample question.

### List All Questions
```bash
pnpm list:questions
```

Groups questions by type with examples.

### Test Specific Question
```bash
pnpm test:question 001be529
```

Tests a specific question and shows if the agent answers correctly.

### Use with Playground
```bash
pnpm mastra dev
```

Opens Playground with all 500 agents loaded. Each agent represents one benchmark question.

## How It Works

### 1. Data Structure
Each question folder contains:
- `db.json` - Conversation messages in Mastra format
- `vector.json` - Pre-computed embeddings for semantic recall
- `meta.json` - Question metadata (question, answer, type)

### 2. Isolated Memory
```typescript
// Each agent gets its own storage instances
const storage = new BenchmarkStore('read-write');
const vectorStore = new BenchmarkVectorStore('read-write');

// Hydrate with question-specific data
await storage.hydrate(dbPath);
await vectorStore.hydrate(vectorPath);
```

### 3. Agent Factory
Creates 500 agents, each named `question_<id>` with:
- Isolated memory containing only its conversation history
- Instructions optimized for the benchmark
- Access to both working memory and semantic recall

### 4. Memory Configuration
Uses the configuration that achieved 80% accuracy:
```typescript
{
  lastMessages: 100,
  workingMemory: { enabled: true },
  semanticRecall: {
    topK: 20,
    messageRange: 5
  }
}
```

## Question Types

- **single-session-user**: Facts from one conversation
- **multi-session**: Information spread across conversations
- **temporal**: Time-based reasoning
- **knowledge-update**: Handling changing information
- **abstention**: Questions with no answer in history

## Performance Notes

- Initial load takes ~30 seconds for all 500 questions
- Each agent's memory is isolated - no cross-contamination
- Embedding cache prevents recomputation
- In-memory storage provides fast access

## Educational Value

This example helps you:
- Understand real long-term memory challenges
- See how different question types test different capabilities
- Explore why some questions are harder than others
- Test your own memory configurations

## Next Steps

- Modify the memory configuration and test accuracy
- Filter questions by type or difficulty
- Build your own benchmark questions
- Compare different models' performance