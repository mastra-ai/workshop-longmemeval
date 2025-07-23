import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { openai } from "@ai-sdk/openai";
import { cachedOpenAI } from "../../embeddings/index.js";
import { BenchmarkStore } from "../storage/benchmark-store.js";
import { BenchmarkVectorStore } from "../storage/benchmark-vector.js";
import { readFile } from "fs/promises";
import { join } from "path";

interface QuestionMetadata {
  questionId: string;
  questionType: string;
  question: string;
  answer: string;
  resourceId: string;
  threadIds: string[];
  sessionCount: number;
  evidenceSessionIds: string[];
  questionDate: string;
}

// LongMemEval instructions optimized for benchmark performance
const LONGMEMEVAL_INSTRUCTIONS = `You are an assistant with excellent long-term memory capabilities being evaluated on the LongMemEval benchmark.

Your primary objective is to accurately answer questions based on information from past conversations.

Key behaviors:
1. Always check your memory for relevant information before answering
2. Reference specific details from previous messages when available
3. If you don't have the information needed to answer a question, clearly state "I don't have that information in my memory" or similar
4. Track temporal relationships between events (what happened before/after)
5. Handle updates to previously stated information by using the most recent version
6. Be precise and avoid making assumptions beyond what you remember

Question types you'll encounter:
- Information extraction: Recalling specific facts from conversations
- Multi-session reasoning: Connecting information across multiple conversations
- Temporal reasoning: Understanding time-based relationships
- Knowledge updates: Handling changing information
- Abstention: Recognizing when information is not available

Remember: Accuracy is more important than being helpful. Only answer based on what you actually remember.`;

export async function createQuestionAgent(
  questionId: string,
  dataPath: string,
): Promise<{ agent: Agent }> {
  // Create isolated storage instances
  const storage = new BenchmarkStore("read");
  const vectorStore = new BenchmarkVectorStore("read");

  // Load question-specific data
  const dbPath = join(dataPath, questionId, "db.json");
  const vectorPath = join(dataPath, questionId, "vector.json");
  const metaPath = join(dataPath, questionId, "meta.json");

  // Load and parse metadata
  const metaContent = await readFile(metaPath, "utf-8");
  const metadata: QuestionMetadata = JSON.parse(metaContent);

  // Hydrate storage with messages
  await storage.hydrate(dbPath);

  // Hydrate vector store with embeddings
  await vectorStore.hydrate(vectorPath);

  // Store metadata in the resource for easy access later
  await storage.updateResource({
    resourceId: metadata.resourceId,
    metadata: {
      question: metadata.question,
      answer: metadata.answer,
      questionType: metadata.questionType,
      sessionCount: metadata.sessionCount,
    },
  });

  // Create memory instance for this agent
  const memory = new Memory({
    storage,
    vector: vectorStore,
    embedder: cachedOpenAI.embedding("text-embedding-3-small"),
    options: {
      semanticRecall: {
        // topK: 1,
        // topK: 2,
        topK: 5,
        // topK: 10,
        // topK: 20,
        // topK: 50,
        // messageRange: 0,
        messageRange: 1,
        scope: "resource",
      },
    },
  });

  // Create agent with question-specific instructions
  const agent = new Agent({
    name: metadata.resourceId, // Use resourceId from metadata to match the data
    description: `Q: "${metadata.question}" | A: "${metadata.answer}" | Type: ${metadata.questionType} | Sessions: ${metadata.sessionCount}`,
    model: openai("gpt-4o"),
    instructions:
      LONGMEMEVAL_INSTRUCTIONS +
      `\n\nToday's date is ${metadata.questionDate}\n\nFor reference, the benchmark question for this conversation is: "${metadata.question}"\nThe expected answer type is: ${metadata.questionType}. when you do not know the date of an event, err on the side of caution and don't count it`,
    memory, // Pass memory directly to the agent
  });

  return { agent };
}

export function createInstructions(metadata: QuestionMetadata): string {
  return (
    LONGMEMEVAL_INSTRUCTIONS +
    `

For this specific evaluation:
- Question Type: ${metadata.questionType}
- Total Sessions: ${metadata.sessionCount}
- The benchmark will test: "${metadata.question}"`
  );
}
