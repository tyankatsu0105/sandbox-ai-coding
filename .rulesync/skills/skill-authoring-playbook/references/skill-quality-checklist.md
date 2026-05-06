# Skill Quality Checklist

Use this checklist to review a new or updated skill before shipping.

## Scope

- [ ] The skill covers one coherent job.
- [ ] Out-of-scope cases are explicitly listed.
- [ ] The skill does not duplicate another existing skill.

## Trigger Quality

- [ ] Description states what to do, when to trigger, and when not to trigger.
- [ ] High-signal trigger words appear early in description.
- [ ] Description avoids broad words that cause false positives.

## Instruction Quality

- [ ] Procedure is step-by-step and action-oriented.
- [ ] Default path is clearly defined.
- [ ] Fallback path is defined for common failure conditions.
- [ ] Instructions teach a reusable method, not one fixed answer.

## Safety

- [ ] Side-effectful actions require explicit invocation.
- [ ] Risky commands are gated with confirmations or checks.
- [ ] Tool access fields are constrained when needed.

## Context Efficiency

- [ ] Main SKILL.md stays concise.
- [ ] Large references and templates are split into separate files.
- [ ] SKILL.md tells the agent exactly when to read each reference.

## Validation

- [ ] There is a validation loop: do work, run check, fix, rerun.
- [ ] Validation commands or review criteria are explicit.
- [ ] Failure handling is clear and actionable.

## Output Contract

- [ ] Output format is explicit.
- [ ] Required evidence is explicit (changed files, checks run, risks).
- [ ] Completion criteria are testable.

## Release Gate

Ship only when all sections above are checked.
