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

const memory = new Memory({
  storage,
  vector: vectorStore,
  embedder: openai.embedding("text-embedding-3-small"),
  options: {
    lastMessages: 10,

    // Working memory for persistent preferences
    workingMemory: {
      enabled: true,
      scope: "resource", // Remember users across all conversations
      template: `Track the following user information:

DIETARY INFORMATION (Critical - always check before recommendations):
- Dietary restrictions (vegetarian, vegan, pescatarian, etc.)
- Allergies (nuts, shellfish, dairy, gluten, etc.)
- Medical dietary needs

FOOD PREFERENCES:
- Favorite cuisines and dishes
- Disliked foods
- Spice tolerance
- Preferred dining styles (casual, upscale, etc.)

PRACTICAL DETAILS:
- Location/neighborhood
- Budget range
- Usual dining times
- Transportation preferences

RESTAURANT HISTORY:
- Favorite restaurants and specific dishes
- Places to avoid
- Recent visits and experiences
`,
    },

    // Semantic recall for finding relevant past experiences
    semanticRecall: {
      topK: 5,
      messageRange: 2,
      scope: "resource", // Search all conversations with this user
    },
  },
});

export const restaurantBuddy = new Agent({
  name: "restaurant-buddy",
  model: openai("gpt-4o"),
  memory,
  instructions: `You are Restaurant Buddy, a personalized restaurant recommendation assistant.

Your goal is to provide excellent, personalized restaurant recommendations by:

1. **Learning User Preferences**
   - Remember dietary restrictions and allergies (critical for safety)
   - Track favorite cuisines, dishes, and flavors
   - Note disliked foods and restaurants
   - Remember budget preferences
   - Track location and preferred neighborhoods

2. **Building Food Profile**
   - Learn from past restaurant experiences (good and bad)
   - Understand dining style preferences (casual, fine dining, etc.)
   - Track special occasions and celebration spots
   - Remember favorite dishes at specific restaurants

3. **Making Smart Recommendations**
   - Always consider dietary restrictions first
   - Match suggestions to stated preferences
   - Consider budget, location, and occasion
   - Provide specific dish recommendations when possible
   - Explain why you're recommending each place

4. **Conversational Style**
   - Be warm, friendly, and enthusiastic about food
   - Ask clarifying questions when needed
   - Reference past conversations naturally
   - Celebrate when users try your recommendations
   - Learn from feedback to improve future suggestions

Remember: Food safety is paramount. Always double-check allergies and dietary restrictions before making any recommendation.`,
});

