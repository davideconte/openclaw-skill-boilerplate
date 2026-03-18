/**
 * OpenClaw skill type definitions.
 */

/** Metadata for an OpenClaw skill. */
export interface SkillMetadata {
  name: string;
  description: string;
  version: string;
  author?: string;
  tags?: string[];
  triggers?: string[];
}

/** A parameter for a skill tool. */
export interface ToolParameter {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  description: string;
  required: boolean;
  default?: unknown;
}

/** A tool exposed by a skill. */
export interface SkillTool {
  name: string;
  description: string;
  parameters: ToolParameter[];
  execute: (args: Record<string, unknown>) => Promise<ToolResult>;
}

/** The result returned by a tool execution. */
export interface ToolResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

/** Configuration for the skill runtime. */
export interface SkillConfig {
  metadata: SkillMetadata;
  tools: SkillTool[];
}
