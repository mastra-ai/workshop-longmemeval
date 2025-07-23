import { mastra } from "./mastra/index.js";

console.log("🧠 Basic Memory Example\n");
console.log(
  "This example demonstrates how Mastra agents can remember information across messages.\n",
);

// Get the agent
const agent = mastra.getAgent("memoryAgent");
const threadId = "demo-thread-" + Date.now();
const resourceId = "memoryAgent";

// First message: Share some information
console.log("--- Message 1: Sharing Information ---");
console.log(
  "User: My name is Alice and I love Italian food, especially pasta carbonara.",
);

const response1 = await agent.generate(
  [
    {
      role: "user",
      content:
        "My name is Alice and I love Italian food, especially pasta carbonara.",
    },
  ],
  {
    threadId,
    resourceId,
  },
);

console.log("Assistant:", response1.text);
console.log();

// Second message: Share more information
console.log("--- Message 2: Adding More Context ---");
console.log(
  "User: I'm also learning to play the guitar and I have a cat named Whiskers.",
);

const response2 = await agent.generate(
  [
    {
      role: "user",
      content:
        "I'm also learning to play the guitar and I have a cat named Whiskers.",
    },
  ],
  {
    threadId,
    resourceId,
  },
);

console.log("Assistant:", response2.text);
console.log();

// Third message: Test memory recall
console.log("--- Message 3: Testing Memory Recall ---");
console.log("User: What do you remember about me?");

const response3 = await agent.generate(
  [{ role: "user", content: "What do you remember about me?" }],
  {
    memory: {
      thread: threadId,
      resource: resourceId,
      options: {
        lastMessages: 0,
      },
    },
  },
);

console.log("Assistant:", response3.text);
console.log();

// Fourth message: Specific recall
console.log("--- Message 4: Specific Question ---");
console.log("User: What's my pet's name?");

const response4 = await agent.generate(
  [{ role: "user", content: "What's my pet's name?" }],
  {
    threadId,
    resourceId,
  },
);

console.log("Assistant:", response4.text);
console.log();

console.log("✅ Memory demonstration complete!");
console.log("\nKey takeaways:");
console.log(
  "- The agent remembered information shared across multiple messages",
);
console.log("- Working memory stored persistent facts about the user");
console.log(
  "- Semantic recall helped find relevant information from past messages",
);
