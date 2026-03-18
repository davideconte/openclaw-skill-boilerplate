import { SkillConfig, SkillMetadata } from "./types";
import { tools } from "./tools";

export { SkillTool, ToolParameter, ToolResult, SkillConfig, SkillMetadata } from "./types";
export { tools, greetTool } from "./tools";

const metadata: SkillMetadata = {
  name: "openclaw-skill-boilerplate",
  description:
    "A production-ready boilerplate for scaffolding new OpenClaw skills.",
  version: "1.0.0",
  tags: ["boilerplate", "scaffold", "developer-tools"],
  triggers: ["scaffold a new skill", "create a skill"],
};

/** The skill configuration, ready for OpenClaw to consume. */
export const skill: SkillConfig = {
  metadata,
  tools,
};

export default skill;
