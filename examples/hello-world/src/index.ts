/**
 * Hello World - A minimal OpenClaw skill example.
 */

export interface ToolResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

const helloTool = {
  name: "hello",
  description: "Greet someone by name.",
  execute: async (args: Record<string, unknown>): Promise<ToolResult> => {
    const name = (args.name as string) || "World";
    return {
      success: true,
      data: `Hello, ${name}!`,
    };
  },
};

export const tools = [helloTool];

export default {
  metadata: {
    name: "hello-world",
    description: "A minimal greeting skill.",
    version: "0.1.0",
  },
  tools,
};
