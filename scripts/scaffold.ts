#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

const TEMPLATE_DIR = path.resolve(__dirname, "..", "templates", "skill");

function usage(): void {
  console.log(`
Usage: openclaw-skill-boilerplate <skill-name>

Scaffold a new OpenClaw skill project.

Example:
  npx openclaw-skill-boilerplate my-awesome-skill
`);
  process.exit(1);
}

function toTitleCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function copyTemplate(
  templatePath: string,
  destPath: string,
  replacements: Record<string, string>
): void {
  let content = fs.readFileSync(templatePath, "utf-8");
  for (const [placeholder, value] of Object.entries(replacements)) {
    content = content.replace(new RegExp(placeholder.replace(/[{}]/g, "\\$&"), "g"), value);
  }

  // Strip .template extension
  const finalPath = destPath.replace(/\.template$/, "");
  const dir = path.dirname(finalPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(finalPath, content, "utf-8");
  console.log(`  Created ${path.relative(process.cwd(), finalPath)}`);
}

function walkDir(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function scaffold(skillName: string): void {
  const targetDir = path.resolve(process.cwd(), skillName);

  if (fs.existsSync(targetDir)) {
    console.error(`Error: Directory "${skillName}" already exists.`);
    process.exit(1);
  }

  console.log(`\nScaffolding OpenClaw skill: ${skillName}\n`);

  const replacements: Record<string, string> = {
    "{{SKILL_NAME}}": skillName,
    "{{SKILL_TITLE}}": toTitleCase(skillName),
    "{{YEAR}}": new Date().getFullYear().toString(),
  };

  // Resolve template dir (works from both src/ and dist/)
  let resolvedTemplateDir = TEMPLATE_DIR;
  if (!fs.existsSync(resolvedTemplateDir)) {
    resolvedTemplateDir = path.resolve(__dirname, "..", "..", "templates", "skill");
  }

  if (!fs.existsSync(resolvedTemplateDir)) {
    console.error("Error: Could not find templates directory.");
    process.exit(1);
  }

  const templateFiles = walkDir(resolvedTemplateDir);

  for (const templateFile of templateFiles) {
    const relativePath = path.relative(resolvedTemplateDir, templateFile);
    const destPath = path.join(targetDir, relativePath);
    copyTemplate(templateFile, destPath, replacements);
  }

  // Initialize git and install dependencies
  console.log("\n  Initializing git repository...");
  execSync("git init", { cwd: targetDir, stdio: "pipe" });

  console.log("  Installing dependencies...\n");
  try {
    execSync("npm install", { cwd: targetDir, stdio: "pipe" });
    console.log("  Dependencies installed successfully.\n");
  } catch {
    console.log("  Skipped npm install (run it manually).\n");
  }

  console.log(`Done! Your skill is ready at ./${skillName}

Next steps:
  cd ${skillName}
  npm run build

To publish to ClaWHub:
  npx clawhub@latest publish
`);
}

// --- Main ---
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  usage();
}

const skillName = args[0]!
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, "-")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "");

if (!skillName) {
  console.error("Error: Invalid skill name.");
  process.exit(1);
}

scaffold(skillName);
