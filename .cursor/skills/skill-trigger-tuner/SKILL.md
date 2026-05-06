---
name: skill-trigger-tuner
description: Tune and debug auto-invocation behavior of existing skills by reducing false positives and false negatives through structured trigger-prompt testing.
---
# Skill Trigger Tuner

Use this skill to improve how reliably a target skill triggers.

## When To Use

- A skill triggers too often on unrelated prompts.
- A skill does not trigger when it clearly should.
- You are refining a skill description after first release.
- You need repeatable evidence for trigger-quality changes.

## When Not To Use

- You are implementing product code unrelated to skills.
- The target skill is already stable with acceptable trigger behavior.
- You only need to rewrite task instructions, not trigger logic.
- You are creating a brand new skill from scratch.
- You are editing rule content quality without evaluating trigger behavior.

## Inputs

- Path to the target skill folder.
- Current `name` and `description` in the target `SKILL.md`.
- Trigger test cases.

## Procedure

1. Read the target `SKILL.md` and extract trigger boundaries from `description`.
2. Run a positive and negative prompt set without explicit slash invocation.
3. Classify each result as TP, FN, FP, or TN.
4. If FN is high, add natural user phrasing and trigger synonyms.
5. If FP is high, tighten boundaries and add explicit non-goals.
6. Keep scope focused: one coherent job only.
7. Re-test after each description change until trigger behavior is acceptable.

## Gotchas

- Broad words like "review", "fix", or "improve" can over-trigger many skills.
- Trigger text that lacks non-goals often creates false positives.
- Overlong descriptions can bury high-signal keywords.

## Validation

1. Confirm FP and FN are both reduced from the baseline run.
2. Verify description still clearly explains what the skill does and does not do.
3. Verify behavior with at least one realistic prompt from current project work.

## Output Requirements

- Updated `description` text.
- Before/after TP, FN, FP, TN counts.
- Short rationale for each description change.
- Residual risks that remain.
