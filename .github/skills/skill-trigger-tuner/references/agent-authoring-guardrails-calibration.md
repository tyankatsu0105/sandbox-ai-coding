# Calibration Log: agent-authoring-guardrails

## Target

- Skill: agent-authoring-guardrails
- File: .rulesync/skills/agent-authoring-guardrails/SKILL.md

## Goal

Reduce false positives by tightening trigger boundaries in frontmatter description.

## Baseline Assessment (Pre-change)

- Observed risk: description could match broad requests containing words like "review" and "refactor" even when not about instruction files.
- Estimated confusion sources:
  - No explicit mention of file types beyond SKILL.md/rules.
  - Missing non-goals in top-level trigger guidance.

## Changes Applied

1. Narrowed frontmatter description to explicit guidance files:

- SKILL.md
- copilot-instructions.md
- rule files under .rulesync/

2. Added explicit trigger intents:

- instruction quality
- trigger boundaries
- safety constraints
- testable wording

3. Added explicit non-goals in body:

- product feature implementation
- runtime debugging
- non-guidance refactors

## Prompt Classification Snapshot

### Positive Prompts (Should Trigger)

1. "Refactor this SKILL.md so it has clear when-to-use boundaries." -> TP
2. "Review copilot-instructions wording for ambiguous requirements." -> TP
3. "Make our .rulesync rule text testable and safer." -> TP

### Negative Prompts (Should Not Trigger)

1. "Fix this Next.js route handler bug." -> TN
2. "Implement dark mode on homepage." -> TN
3. "Speed up this SQL query." -> TN

## Result Summary

- Before: FP risk medium, FN risk low-medium.
- After: FP risk low-medium, FN risk low.

## Residual Risk

- Requests that mention "review guidance" without file context may still partially match.
- If FP remains in practice, next tightening step is adding examples of non-trigger prompts directly in description.
