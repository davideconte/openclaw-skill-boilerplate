---
name: openclaw-skill-boilerplate
description: A production-ready boilerplate for scaffolding new OpenClaw skills. Provides templates, tooling, and examples to help developers build and publish skills to ClaWHub.
version: 1.0.0
author: ""
tags:
  - boilerplate
  - scaffold
  - developer-tools
  - skill-template
triggers:
  - scaffold a new skill
  - create a skill
  - skill boilerplate
  - new openclaw skill
---

# OpenClaw Skill Boilerplate

This skill helps developers scaffold new OpenClaw skills quickly.

## Usage

Use this skill when you need to create a new OpenClaw skill from scratch. It provides:

- A standardized project structure
- TypeScript support with strict mode
- Example tool definitions
- CI/CD workflow
- Ready-to-publish configuration

## Tools

### scaffold

Scaffold a new OpenClaw skill project.

**Parameters:**
- `skillName` (string, required): The name of the new skill to create

**Example:**
```
Create a new skill called "my-awesome-skill"
```

This will generate a complete skill project with all necessary files, types, and configuration.

## Quick Start

```bash
npx openclaw-skill-boilerplate my-skill-name
```

Or install globally:

```bash
npm install -g openclaw-skill-boilerplate
openclaw-skill-boilerplate my-skill-name
```
