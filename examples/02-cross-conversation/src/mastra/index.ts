import { Mastra } from "@mastra/core";
import { personalAssistant } from "./agents/index.js";

export const mastra = new Mastra({
  agents: { personalAssistant },
});

