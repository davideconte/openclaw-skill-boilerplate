import { SkillTool, ToolResult } from "./types";

/**
 * Example tool: greet
 *
 * Demonstrates how to define an OpenClaw skill tool with typed parameters.
 */
export const greetTool: SkillTool = {
  name: "greet",
  description: "Greet a user by name. A simple example tool to demonstrate the pattern.",
  parameters: [
    {
      name: "name",
      type: "string",
      description: "The name of the person to greet",
      required: true,
    },
    {
      name: "enthusiasm",
      type: "number",
      description: "Number of exclamation marks (1-5)",
      required: false,
      default: 1,
    },
  ],
  execute: async (args: Record<string, unknown>): Promise<ToolResult> => {
    const name = args.name as string;
    const enthusiasm = Math.min(5, Math.max(1, (args.enthusiasm as number) ?? 1));
    const exclamation = "!".repeat(enthusiasm);

    return {
      success: true,
      data: `Hello, ${name}${exclamation}`,
    };
  },
};

/** All tools exported by this skill. */
export const tools: SkillTool[] = [greetTool];
