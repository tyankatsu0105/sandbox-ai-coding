# Calibration Log: skill-authoring-playbook

## Target

- Skill: skill-authoring-playbook
- File: .rulesync/skills/skill-authoring-playbook/SKILL.md

## Goal

Reduce false positives for implementation-focused requests while preserving strong recall for skill-authoring work.

## Baseline Assessment (Pre-change)

- Observed risk: frontmatter emphasized generic verbs like create/review/refactor and could match non-authoring requests.
- Estimated confusion sources:
  - No direct mention of authoring artifacts beyond SKILL.md.
  - Non-goals did not clearly exclude product coding work.

## Changes Applied

1. Tightened frontmatter description to explicit skill-authoring intent:

- scope design
- trigger calibration
- safety boundaries
- quality validation

2. Added non-goals in body:

- product feature implementation
- runtime bug fixing
- general code review outside skill authoring files

## Prompt Classification Snapshot

### Positive Prompts (Should Trigger)

1. "Refactor this SKILL.md to reduce over-triggering." -> TP
2. "Create a reusable skill template with validation steps." -> TP
3. "Tune description boundaries for this skill." -> TP

### Negative Prompts (Should Not Trigger)

1. "Fix this API route crash." -> TN
2. "Add pagination to this endpoint." -> TN
3. "Improve Lighthouse performance for homepage." -> TN

## Result Summary

- Before: FP risk medium, FN risk low.
- After: FP risk low-medium, FN risk low.

## Residual Risk

- Requests that mention "refactor skill" without file context may still trigger.
- If FP remains, next step is adding explicit non-trigger examples in frontmatter wording.
