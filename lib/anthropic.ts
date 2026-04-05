import Anthropic from "@anthropic-ai/sdk";

export function getAnthropic() {
  if (!process.env.ANTHROPIC_API_KEY) {
    return null;
  }

  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });
}
