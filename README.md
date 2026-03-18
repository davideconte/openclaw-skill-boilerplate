# openclaw-skill-boilerplate

[![CI](https://github.com/davideconte/openclaw-skill-boilerplate/actions/workflows/ci.yml/badge.svg)](https://github.com/davideconte/openclaw-skill-boilerplate/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/openclaw-skill-boilerplate.svg)](https://www.npmjs.com/package/openclaw-skill-boilerplate)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-skill-brightgreen)](https://github.com/openclaw/openclaw)

Production-ready boilerplate for building [OpenClaw](https://github.com/openclaw/openclaw) skills. Scaffold, develop, and publish skills to ClaWHub in minutes.

## Quick Start

### Scaffold a new skill

```bash
npx openclaw-skill-boilerplate my-awesome-skill
cd my-awesome-skill
npm run build
```

This generates a complete skill project with TypeScript, SKILL.md, and all the boilerplate you need.

### Install as a dependency

```bash
npm install -g openclaw-skill-boilerplate
openclaw-skill-boilerplate my-skill
```

## What is an OpenClaw Skill?

A skill is a directory with a `SKILL.md` file and supporting code that extends an AI agent's capabilities. Skills are distributed via [ClaWHub](https://github.com/openclaw/openclaw) and installed with:

```bash
npx clawhub@latest install <skill-name>
```

## Project Structure

```
openclaw-skill-boilerplate/
├── SKILL.md                        # Skill entrypoint (OpenClaw reads this)
├── README.md                       # Documentation
├── package.json                    # npm package config
├── tsconfig.json                   # TypeScript strict mode
├── src/
│   ├── index.ts                    # Main skill logic & exports
│   ├── tools.ts                    # Tool definitions
│   └── types.ts                    # Shared TypeScript types
├── scripts/
│   └── scaffold.ts                 # CLI scaffolding script
├── templates/
│   └── skill/                      # Template files for scaffolding
│       ├── SKILL.md.template
│       ├── src/index.ts.template
│       ├── package.json.template
│       ├── tsconfig.json
│       └── .gitignore
├── examples/
│   └── hello-world/                # Minimal working example
│       ├── SKILL.md
│       └── src/index.ts
└── .github/
    └── workflows/
        └── ci.yml                  # CI: build & type check
```

## SKILL.md Spec

Every OpenClaw skill needs a `SKILL.md` with YAML frontmatter:

```yaml
---
name: my-skill
description: What your skill does
version: 0.1.0
author: your-name
tags:
  - category
triggers:
  - natural language trigger phrase
---
```

The body contains documentation that the AI agent reads to understand how to use the skill, including tool descriptions, parameters, and examples.

## Developing Your Skill

### 1. Define your tools

Edit `src/tools.ts` (or the generated `src/index.ts`) to define the tools your skill provides:

```typescript
const myTool: SkillTool = {
  name: "my-tool",
  description: "What this tool does",
  parameters: [
    {
      name: "input",
      type: "string",
      description: "The input to process",
      required: true,
    },
  ],
  execute: async (args) => {
    const input = args.input as string;
    return { success: true, data: `Result: ${input}` };
  },
};
```

### 2. Document in SKILL.md

Add your tool to the `## Tools` section of `SKILL.md` so the AI agent knows how to use it.

### 3. Build

```bash
npm run build        # Compile TypeScript
npm run typecheck    # Type check only
npm run dev          # Watch mode
```

## Publishing to ClaWHub

Once your skill is ready:

```bash
# 1. Make sure it builds
npm run build

# 2. Publish to ClaWHub
npx clawhub@latest publish

# 3. Others can install it with
npx clawhub@latest install your-skill-name
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run dev` | Watch mode compilation |
| `npm run typecheck` | Type check without emitting |
| `npm run scaffold` | Scaffold a new skill (dev mode) |

## Example

See [`examples/hello-world/`](examples/hello-world/) for a minimal working skill that demonstrates the pattern.

## License

MIT
