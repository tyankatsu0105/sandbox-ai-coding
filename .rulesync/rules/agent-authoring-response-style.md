---
root: false
targets: ["*"]
description: "Response style rule for AI agent guidance authoring tasks"
globs:
  - ".rulesync/**/*.md"
  - ".github/skills/**/*.md"
  - ".cursor/skills/**/*.md"
  - ".claude/skills/**/*.md"
---

# Agent Authoring Response Style

## Intent

Define additional response expectations specific to AI guidance authoring and review tasks.

## Applies When

- The task is creating, reviewing, or refactoring guidance files such as SKILL.md, copilot-instructions.md, or rule files.
- The user requests instruction wording changes, rule-quality improvements, or guardrail updates.

## Must

- Apply the baseline behavior from `.rulesync/rules/agent-response-behavior.md`.
- Explain why guidance text is placed in a skill vs a rule when the task involves moving content.
- Keep proposals testable by including clear trigger/scope/verification language.

## Must Not

- Leave ownership boundaries ambiguous between rules and skills.
- Propose guidance changes that cannot be validated in the repository.

## Verification

- Confirm the response includes explicit reasoning for rule/skill placement.
- Confirm guidance proposals include observable scope and validation checks.

## Completion Criteria

- Authoring-specific behavior is separate from global response behavior.
- Guidance tasks consistently include rule-vs-skill rationale and testable wording.
