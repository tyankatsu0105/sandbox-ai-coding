# Calibration Log: rule-authoring-playbook

## Target

- Skill: rule-authoring-playbook
- File: .rulesync/skills/rule-authoring-playbook/SKILL.md

## Goal

Reduce false positives for non-rule tasks while preserving strong recall for rule-authoring requests.

## Baseline Assessment (Pre-change)

- Observed risk: wording could match broad instruction-editing requests that are actually skill-focused rather than rule-focused.
- Estimated confusion sources:
  - Description emphasized ecosystems broadly but not explicit conflict-control purpose.
  - Non-goals did not explicitly exclude skill/subagent authoring.

## Changes Applied

1. Tightened frontmatter description:
- explicit focus on rule scope design
- precedence and conflict control
- concise and testable rule behavior

2. Added explicit non-goals:
- skill or subagent creation
- general code reviews not tied to instruction/rule configuration

## Prompt Classification Snapshot

### Positive Prompts (Should Trigger)

1. "Create path-specific Copilot instructions for app routes." -> TP
2. "Refactor these Cursor rules to avoid precedence conflicts." -> TP
3. "Review our rule files for overlap and ambiguity." -> TP

### Negative Prompts (Should Not Trigger)

1. "Create a skill for deployment workflow." -> TN
2. "Fix a runtime error in route handler." -> TN
3. "Refactor React components for readability." -> TN

## Result Summary

- Before: FP risk medium, FN risk low.
- After: FP risk low-medium, FN risk low.

## Residual Risk

- Requests that mention "instruction files" without saying rule/instructions scope may still partially match.
- If FP remains, add explicit non-trigger phrase examples to description.
