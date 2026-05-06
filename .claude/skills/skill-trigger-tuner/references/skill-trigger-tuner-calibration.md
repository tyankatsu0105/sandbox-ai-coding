# Calibration Log: skill-trigger-tuner

## Target

- Skill: skill-trigger-tuner
- File: .rulesync/skills/skill-trigger-tuner/SKILL.md

## Goal

Reduce false positives where this tuner skill triggers for general skill authoring requests that are not about trigger behavior.

## Baseline Assessment (Pre-change)

- Observed risk: wording could match broad requests about SKILL.md edits even when no trigger calibration was requested.
- Estimated confusion sources:
  - Description referenced SKILL.md tuning broadly.
  - Non-goals did not explicitly exclude new skill creation and non-trigger edits.

## Changes Applied

1. Tightened frontmatter description to explicit purpose:
- existing skill auto-invocation behavior
- false positive / false negative reduction
- structured trigger-prompt testing

2. Added explicit non-goals:
- creating a new skill from scratch
- editing rule/skill content quality without trigger evaluation

## Prompt Classification Snapshot

### Positive Prompts (Should Trigger)

1. "This skill over-triggers on unrelated prompts. Tune its description." -> TP
2. "Calibrate FN/FP for this skill using a prompt test set." -> TP
3. "Debug why this skill is not auto-invoked and adjust boundaries." -> TP

### Negative Prompts (Should Not Trigger)

1. "Create a new skill for deployment workflow." -> TN
2. "Rewrite this SKILL.md to be more readable." -> TN
3. "Improve rule wording in .rulesync without changing triggers." -> TN

## Result Summary

- Before: FP risk medium, FN risk low.
- After: FP risk low, FN risk low.

## Residual Risk

- Requests that say "tune skill" without mentioning trigger behavior may still partially match.
- If FP remains, add direct non-trigger examples to frontmatter description.
