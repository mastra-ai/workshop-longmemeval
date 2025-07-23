# Example 4: Restaurant Recommendation Agent

A practical example showing how to build a personalized restaurant recommendation agent using Mastra's memory system.

## What You'll Learn

- Building a real-world agent with complex memory needs
- Using working memory templates for structured data
- Combining working memory with semantic recall
- Handling critical information (allergies) safely
- Creating agents that build relationships over time

## Features

The Restaurant Buddy agent demonstrates:

1. **Safety-First Approach**: Always remembers allergies and dietary restrictions
2. **Preference Learning**: Tracks cuisines, dishes, and dining styles
3. **Contextual Awareness**: Considers location, budget, and occasion
4. **Relationship Building**: References past experiences and recommendations
5. **Adaptive Behavior**: Learns from user feedback

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Add your OpenAI API key to `.env`

## Running the Example

```bash
pnpm dev
```

## How It Works

### Working Memory Template

The agent uses a structured template to organize user information:

```typescript
workingMemory: {
  template: `Track the following user information:
  
  DIETARY INFORMATION (Critical):
  - Dietary restrictions
  - Allergies
  - Medical dietary needs
  
  FOOD PREFERENCES:
  - Favorite cuisines
  - Disliked foods
  ...`
}
```

### Resource-Scoped Memory

Uses `scope: 'resource'` to remember users across all conversations:
- Dietary restrictions persist forever
- Preferences accumulate over time
- Past experiences inform future recommendations

## Key Design Decisions

1. **Allergy Safety**: Dietary restrictions are marked as "Critical" in the template
2. **Natural Conversation**: Agent references past interactions organically
3. **Specific Recommendations**: Goes beyond generic suggestions
4. **Feedback Loop**: Learns from user experiences

## Use Cases

- Restaurant recommendation apps
- Personal dining assistants
- Hotel concierge services
- Food delivery platforms
- Travel planning applications

## Next Steps

- Add integration with restaurant APIs
- Implement location-based filtering
- Add photo memory for favorite dishes
- Create group dining coordination features