# Mastra Agent Memory Workshop

Workshop materials for building AI agents with advanced memory capabilities using [Mastra](https://mastra.ai).

## 📅 Workshop Info

**Date**: July 24, 2025  
**Time**: 11:00 AM - 12:00 PM Central Time  
**Duration**: 1 hour  
**Event**: [Lu.ma](https://lu.ma/n6w50v8s)

## 🎯 What You'll Learn

- **Memory Fundamentals**: Understanding Working Memory vs Semantic Recall
- **Benchmark Performance**: How Mastra achieved 80% accuracy on LongMemEval
- **Practical Implementation**: Building agents that remember users across conversations

## 🛠️ Prerequisites

- Node.js v20+ installed
- OpenAI API key
- Basic JavaScript/TypeScript knowledge

## 🚀 Quick Start

1. Clone this repository:

```bash
git clone <repo-url>
cd workshop-repo
```

2. Choose an example to explore:

```bash
cd examples/01-basic-memory
pnpm install
```

3. Add your OpenAI API key to `.env`:

```bash
# Uncomment and add your key
OPENAI_API_KEY=your_key_here
```

4. Run the example:

```bash
pnpm dev
```

## 📁 Workshop Examples

### [01-basic-memory](./examples/01-basic-memory)

Learn the fundamentals of adding memory to Mastra agents:

- Setting up LibSQL storage
- Configuring working memory and semantic recall
- Thread-scoped conversations

### [02-cross-conversation](./examples/02-cross-conversation)

Build agents that remember users across multiple conversations:

- Resource-scoped memory
- Persistent user profiles
- Cross-thread information retrieval

### [03-longmemeval-exploration](./examples/03-longmemeval-exploration)

Interactive exploration of 500 real LongMemEval benchmark questions:

- Each agent has isolated memory with pre-loaded history
- Test different question types interactively
- Understand real-world memory challenges

### [04-restaurant-agent](./examples/04-restaurant-agent)

Build a practical restaurant recommendation agent:

- Structured working memory templates
- Real-world application patterns

## 🧠 Memory Concepts

### Working Memory

- Persistent storage for user information
- Can be thread-scoped or resource-scoped
- Supports structured templates

### Semantic Recall

- Vector-based retrieval of relevant messages
- Configurable search scope and result count
- Includes surrounding context

## 📚 Resources

- [Mastra Documentation](https://mastra.ai/docs)
- [Memory System Guide](https://mastra.ai/docs/memory/overview)
- [LongMemEval Paper](https://arxiv.org/abs/2410.10813)
- [GitHub Repository](https://github.com/mastra-ai/mastra)

## 💬 Get Help

- **Discord**: [Join our community](https://discord.gg/mastra)
- **GitHub Issues**: [Report bugs or request features](https://github.com/mastra-ai/mastra/issues)
- **Twitter**: [@mastra_ai](https://twitter.com/mastra_ai)

---

Built with ❤️ by the Mastra team

