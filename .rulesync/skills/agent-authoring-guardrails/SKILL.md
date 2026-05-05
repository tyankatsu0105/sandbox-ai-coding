---
name: agent-authoring-guardrails
description: >-
  Guidance for writing high-quality AI agent skills and rules.
  Use when creating, reviewing, or refactoring SKILL.md and rule files.
targets: ["*"]
---

# Agent Skill and Rule Authoring Guardrails

Use this skill when you need to create or review guidance for AI coding agents.
The goal is to make instructions clear, testable, and safe while avoiding noisy or conflicting rules.

## Project-Specific Workflow

- Edit source files under `.rulesync/` when changing rules or skills.
- After edits, run `npm run generate-docs` from the project root.
- Treat generation as required validation, not optional cleanup.

## Communication Rules for Responses

- Answer first. If further action might help, ask the user after answering.
- Do not apologize. Do not include gratitude phrases.
- When implementing or changing anything, explain the reason and evidence for that decision.
- When explaining a concept, use plain language that a high school student can follow.

## Quick Checklist

- Define scope first: what this instruction applies to, and what it does not.
- Prefer explicit triggers: when to invoke the skill or apply the rule.
- Use action-oriented language: imperative, concrete verbs, no vague guidance.
- Make requirements testable: include success criteria that can be verified.
- Keep precedence clear: resolve conflicts between global rules and local exceptions.
- Minimize ambiguity: define terms like "large change", "fast", "safe", "done".
- Require verification: add lint, test, or runtime checks where applicable.
- Avoid overfitting to one tool unless tool-specific behavior is required.
- Keep content concise and modular: one file should solve one decision area.

## Rule Writing Principles

1. State intent and boundary.
2. Specify mandatory behavior using "must" and optional behavior using "should".
3. Include explicit do and do-not lists.
4. Encode escalation paths for blockers (missing permissions, missing files, unclear requirements).
5. Add measurable completion criteria.

### Good Rule Pattern

- Intent: one sentence.
- Trigger: exact condition.
- Required actions: ordered list.
- Prohibited actions: short list.
- Verification: command or observable outcome.

## Skill Writing Principles

1. Start with "When to use" and "When not to use".
2. Provide minimal workflow steps in execution order.
3. Prefer reusable templates over long prose.
4. Include at least one concrete example.
5. Keep tool constraints explicit (allowed tools, forbidden operations, safety constraints).

### Recommended Skill Sections

- Title and summary
- Invocation criteria
- Inputs expected from user/context
- Procedure (ordered)
- Validation steps
- Failure handling
- Output format expectations

## Anti-Patterns to Avoid

- Conflicting directives in different files without precedence notes.
- Requirements that cannot be verified in the repository.
- Overly broad mandates like "always optimize" with no definition.
- Hidden assumptions about branch names, OS, or package managers.
- Redundant restatements of generic policy with no project-specific value.

## Minimal Templates

### Rule Template

```md
# Rule Name

## Intent

One-sentence objective.

## Applies When

- Condition A
- Condition B

## Must

- Required behavior 1
- Required behavior 2

## Must Not

- Prohibited behavior 1

## Verification

- Command or check:
  - `npm test`
  - `npm run lint`

## Completion Criteria

- Observable result 1
- Observable result 2
```

### Skill Template

```md
---
name: my-skill
description: One-line usage description
targets: ["*"]
---

# My Skill

## When To Use

- Trigger condition 1
- Trigger condition 2

## When Not To Use

- Out-of-scope condition

## Procedure

1. Gather context.
2. Decide approach with constraints.
3. Apply minimal change.
4. Validate with tests/checks.
5. Report results and remaining risks.

## Output Requirements

- Include changed files.
- Include verification outcome.
- Include unresolved risks.
```

## Review Pass Before Publishing

- Is every mandatory instruction objectively testable?
- Is each section free of contradictory wording?
- Can a new contributor follow this without tribal knowledge?
- Are dangerous operations explicitly controlled?
- Is the file short enough to be scanned in under 2 minutes?
- Did you edit under `.rulesync/` and run `npm run generate-docs`?

If any answer is "no", revise before publishing.
