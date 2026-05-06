# Trigger Calibration Prompts

Use this set to test implicit trigger behavior of a target skill.

## How To Use

1. Replace <target-skill> and task details with your actual skill and domain.
2. Run each prompt once without explicit slash invocation.
3. Mark result as one of:

- TP: should trigger and did trigger
- FN: should trigger but did not trigger
- FP: should not trigger but did trigger
- TN: should not trigger and did not trigger

4. Tighten or relax description and when-to-use boundaries.
5. Repeat until FP and FN are low enough for your workflow.

## Should Trigger (Positive Set)

1. Draft a new <target-skill> for this repository and include clear steps.
2. Refactor this SKILL.md because it is too generic and triggers incorrectly.
3. Help me define when this skill should and should not run.
4. Improve this skill description so auto-invocation works better.
5. Add gotchas and validation steps to this skill.
6. Turn this repeated manual process into a reusable skill.
7. Audit this skill for scope creep and rewrite it.
8. Build a concise skill template for this workflow.
9. Review this skill and point out anti-patterns.
10. Calibrate this skill so it stops triggering on unrelated requests.

## Should Not Trigger (Negative Set)

1. Fix this TypeScript compile error in app routing.
2. Implement dark mode toggle for the homepage.
3. Investigate why CI failed on test snapshot updates.
4. Optimize this SQL query performance issue.
5. Write unit tests for this React component.
6. Explain this Git rebase conflict.
7. Add API pagination to this endpoint.
8. Summarize this pull request.
9. Update README with setup instructions.
10. Create a script to clean old log files.

## Result Log Template

| Prompt # | Expected | Actual     | Result (TP/FN/FP/TN) | Notes                  |
| -------- | -------- | ---------- | -------------------- | ---------------------- |
| 1        | Trigger  | Trigger    | TP                   |                        |
| 2        | Trigger  | No Trigger | FN                   | description too narrow |

## Adjustment Guide

- Many FN: add common user phrasing and synonyms to description.
- Many FP: add explicit non-goals and narrower boundaries.
- Mixed errors: split into two smaller skills with cleaner scopes.
