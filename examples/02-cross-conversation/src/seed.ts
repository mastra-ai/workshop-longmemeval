import { mastra } from "./mastra/index.js";

console.log("🔄 Cross-Conversation Memory Example\n");
console.log(
  "This example shows how agents can remember users across different conversation threads.\n",
);

const agent = mastra.getAgent("personalAssistant");
const userId = "personalAssistant";

// Thread 1: Initial conversation
console.log("=== Thread 1: First Meeting ===");
console.log(
  "User: Hi! I'm Sarah. I'm a vegetarian and I work as a software engineer.",
);

const response1 = await agent.generate(
  [
    {
      role: "user",
      content:
        "Hi! I'm Sarah. I'm a vegetarian and I work as a software engineer.",
    },
  ],
  {
    threadId: "thread-1",
    resourceId: userId, // Links memory to this user
  },
);

console.log("Assistant:", response1.text);
console.log();

// Thread 1: Continue conversation
console.log("User: I also love hiking and I'm learning Spanish.");

const response2 = await agent.generate(
  [{ role: "user", content: "I also love hiking and I'm learning Spanish." }],
  {
    threadId: "thread-1",
    resourceId: userId,
  },
);

console.log("Assistant:", response2.text);
console.log("\n--- End of Thread 1 ---\n");

// Thread 2: Different conversation, same user
console.log("=== Thread 2: New Conversation (Different Thread) ===");
console.log("User: Hey, can you recommend a good restaurant for lunch?");

const response3 = await agent.generate(
  [
    {
      role: "user",
      content: "Hey, can you recommend a good restaurant for lunch?",
    },
  ],
  {
    threadId: "thread-2", // Different thread
    resourceId: userId, // Same user
  },
);

console.log("Assistant:", response3.text);
console.log("(Notice: The assistant should remember Sarah is vegetarian)\n");

// Thread 3: Testing broader memory
console.log("=== Thread 3: Another New Conversation ===");
console.log("User: What do you know about me?");

const response4 = await agent.generate(
  [{ role: "user", content: "What do you know about me?" }],
  {
    threadId: "thread-3", // Yet another thread
    resourceId: userId, // Same user
  },
);

console.log("Assistant:", response4.text);
console.log();

// Thread 4: Update information
console.log("=== Thread 4: Updating Information ===");
console.log("User: I just got promoted to senior engineer!");

const response5 = await agent.generate(
  [{ role: "user", content: "I just got promoted to senior engineer!" }],
  {
    threadId: "thread-4",
    resourceId: userId,
  },
);

console.log("Assistant:", response5.text);
console.log();

console.log("✅ Cross-conversation memory demonstration complete!");
console.log("\nKey takeaways:");
console.log(
  "- The agent remembered Sarah across 4 different conversation threads",
);
console.log(
  "- Resource-scoped memory links all conversations to the same user",
);
console.log(
  "- Dietary preferences were recalled when recommending restaurants",
);
console.log(
  "- The agent maintained context about Sarah throughout all interactions",
);

