# Calibration Log: nextjs

## Target

- Skill: nextjs
- File: .rulesync/skills/nextjs/SKILL.md

## Goal

Reduce false positives for non-framework coding tasks while preserving high recall for Next.js-specific work.

## Baseline Assessment (Pre-change)

- Observed risk: description used broad wording like "any Next.js code" and could over-match mixed frontend tasks.
- Estimated confusion sources:
  - No explicit non-goals for non-framework work.
  - Trigger text did not prioritize concrete Next.js artifacts.

## Changes Applied

1. Tightened frontmatter description to explicit artifact scope:

- app router files
- route handlers
- proxy
- data fetching/caching
- next.config.ts
- Next.js CLI behavior

2. Added explicit `When To Use` section with concrete file and API contexts.

3. Added explicit `When Not To Use` section:

- generic TypeScript/React logic
- SQL/CI/styling-only work
- AI skill/rule authoring under .rulesync/

## Prompt Classification Snapshot

### Positive Prompts (Should Trigger)

1. "Update app router page params handling for Next.js 16 async params." -> TP
2. "Migrate middleware.ts behavior to proxy.ts." -> TP
3. "Fix route handler caching behavior in app/api/users/route.ts." -> TP

### Negative Prompts (Should Not Trigger)

1. "Optimize this PostgreSQL query." -> TN
2. "Write unit tests for a utility function in utils/date.ts." -> TN
3. "Refactor AI skill description in .rulesync." -> TN

## Result Summary

- Before: FP risk medium, FN risk low.
- After: FP risk low-medium, FN risk low.

## Residual Risk

- Mixed requests that combine Next.js and generic React work may still trigger (acceptable).
- If FP remains, next step is adding positive/negative phrase examples directly in description.
