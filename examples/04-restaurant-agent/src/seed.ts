import { mastra } from "./mastra/index.js";

console.log("🍽️  Restaurant Buddy - Your Personal Food Assistant\n");
console.log(
  "This example shows a practical application of Mastra's memory system.\n",
);

const agent = mastra.getAgent("restaurantBuddy");
const userId = "restaurantBuddy";

// Day 1: Initial conversation
console.log("=== Day 1: Getting to Know You ===");
console.log(
  "User: Hi! I just moved to Brooklyn and need help finding good restaurants.",
);

const day1_1 = await agent.generate(
  [
    {
      role: "user",
      content:
        "Hi! I just moved to Brooklyn and need help finding good restaurants.",
    },
  ],
  {
    threadId: "day-1",
    resourceId: userId,
  },
);
console.log("Restaurant Buddy:", day1_1.text);

console.log(
  "\nUser: I'm pescatarian and have a severe peanut allergy. I love spicy food!",
);
const day1_2 = await agent.generate(
  [
    {
      role: "user",
      content:
        "I'm pescatarian and have a severe peanut allergy. I love spicy food!",
    },
  ],
  {
    threadId: "day-1",
    resourceId: userId,
  },
);
console.log("Restaurant Buddy:", day1_2.text);

console.log(
  "\nUser: My budget is usually $20-30 per meal, and I live in Park Slope.",
);
const day1_3 = await agent.generate(
  [
    {
      role: "user",
      content:
        "My budget is usually $20-30 per meal, and I live in Park Slope.",
    },
  ],
  {
    threadId: "day-1",
    resourceId: userId,
  },
);
console.log("Restaurant Buddy:", day1_3.text);

// Day 3: Follow-up in new thread
console.log("\n\n=== Day 3: Trying Recommendations (New Thread) ===");
console.log(
  "User: I tried that Thai place you mentioned - the pad thai was amazing!",
);

const day3_1 = await agent.generate(
  [
    {
      role: "user",
      content:
        "I tried that Thai place you mentioned - the pad thai was amazing!",
    },
  ],
  {
    threadId: "day-3",
    resourceId: userId,
  },
);
console.log("Restaurant Buddy:", day3_1.text);

console.log("\nUser: What's good for a casual dinner tonight?");
const day3_2 = await agent.generate(
  [{ role: "user", content: "What's good for a casual dinner tonight?" }],
  {
    threadId: "day-3",
    resourceId: userId,
  },
);
console.log("Restaurant Buddy:", day3_2.text);
console.log(
  "(Should remember: pescatarian, peanut allergy, loves spicy, Park Slope, $20-30 budget)",
);

// Day 7: Testing allergy awareness
console.log("\n\n=== Day 7: Testing Allergy Awareness (New Thread) ===");
console.log(
  "User: Someone recommended this new Asian fusion place. Is it safe for me?",
);

const day7 = await agent.generate(
  [
    {
      role: "user",
      content:
        "Someone recommended this new Asian fusion place. Is it safe for me?",
    },
  ],
  {
    threadId: "day-7",
    resourceId: userId,
  },
);
console.log("Restaurant Buddy:", day7.text);
console.log("(Should check about peanut safety)");

// Day 10: Preference evolution
console.log("\n\n=== Day 10: Evolving Preferences ===");
console.log(
  "User: I've been getting into Mediterranean food lately. Any suggestions?",
);

const day10 = await agent.generate(
  [
    {
      role: "user",
      content:
        "I've been getting into Mediterranean food lately. Any suggestions?",
    },
  ],
  {
    threadId: "day-10",
    resourceId: userId,
  },
);
console.log("Restaurant Buddy:", day10.text);

// Day 14: Special occasion
console.log("\n\n=== Day 14: Special Occasion ===");
console.log(
  "User: It's my birthday next week! Where should I go for a special dinner?",
);

const day14 = await agent.generate(
  [
    {
      role: "user",
      content:
        "It's my birthday next week! Where should I go for a special dinner?",
    },
  ],
  {
    threadId: "day-14",
    resourceId: userId,
  },
);
console.log("Restaurant Buddy:", day14.text);

// Test comprehensive memory
console.log("\n\n=== Testing Comprehensive Memory ===");
console.log(
  "User: Can you remind me of all the dietary restrictions you have on file for me?",
);

const memoryTest = await agent.generate(
  [
    {
      role: "user",
      content:
        "Can you remind me of all the dietary restrictions you have on file for me?",
    },
  ],
  {
    threadId: "memory-test",
    resourceId: userId,
  },
);
console.log("Restaurant Buddy:", memoryTest.text);

console.log("\n\n✅ Restaurant Buddy demonstration complete!");
console.log("\nKey features demonstrated:");
console.log("- Persistent dietary restrictions and allergy tracking");
console.log("- Learning and adapting to user preferences");
console.log("- Location and budget awareness");
console.log("- Building a relationship through multiple interactions");
console.log("- Safety-first approach to food allergies");

