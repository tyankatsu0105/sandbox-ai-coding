# Rule Quality Checklist

Use this checklist before shipping a new or updated rule.

## Scope

- [ ] Rule has one clear purpose.
- [ ] Scope is explicit (global/repo/path-specific).
- [ ] Out-of-scope behavior is explicitly stated.

## Clarity

- [ ] Instructions are concise and actionable.
- [ ] Avoids vague terms like "best practices" without details.
- [ ] Uses concrete do/don't language where appropriate.

## Conflict and Precedence

- [ ] Reviewed for overlap with existing rules.
- [ ] No contradictory instruction with higher/lower layers.
- [ ] Precedence assumptions are documented if needed.

## Context Efficiency

- [ ] Rule is short and focused.
- [ ] Uses references/examples instead of large copied blocks.
- [ ] Avoids style-only requirements better handled by lint/format tools.

## Validation

- [ ] Includes at least one in-scope test case.
- [ ] Includes at least one out-of-scope test case.
- [ ] FP/FN behavior has been checked and noted.

## Release

- [ ] Change rationale is recorded.
- [ ] Rule location and scope metadata are correct.
- [ ] Repository generation/sync step has been run.
