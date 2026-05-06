---
name: rule-authoring-playbook
description: >-
  Create, review, or refactor AI rule files for Cursor, GitHub Copilot, and
  related ecosystems. Use for rule scope design, precedence and conflict
  control, concise rule wording, and testable rule behavior.
targets: ["*"]
---

# Rule Authoring Playbook

Use this skill to design high-quality rules that are scoped correctly, easy to maintain, and reliable in real use.

## When To Use

- Creating or refactoring project rules.
- Converting repeated prompt guidance into reusable rules.
- Reducing rule conflicts across global, repo, and path-specific layers.
- Improving rule quality (clarity, specificity, and testability).

## When Not To Use

- Implementing product features unrelated to rule files.
- Writing one-off task prompts with no reuse intent.
- Enforcing formatting concerns better handled by linters/formatters.
- Creating skills or subagents that are not rule files.
- General code review tasks unrelated to instruction/rule configuration.

## Cross-Platform Rule Principles

1. Keep rules short, self-contained, and broadly reusable in their scope.
2. Pick one clear scope per rule: global, repository, or path-specific.
3. Prefer concrete and testable directives over vague style language.
4. Avoid overlapping rules with contradictory outcomes.
5. Use examples and references instead of copying long documents.
6. Add constraints only where the model repeatedly fails.
7. Treat precedence explicitly when multiple rule layers exist.
8. Validate with representative prompts and conflict checks.

## Rule Scope and Precedence

Different ecosystems apply layered instructions in different ways, but the shared pattern is:

- Narrower, more local context should be used for project specifics.
- Higher-priority layers can override lower-priority layers.
- Conflicting instructions reduce reliability even when precedence is defined.

Design to minimize conflicts instead of relying on precedence alone.

## Authoring Procedure

1. Define the problem and repetition pattern.

- Identify repeated guidance that appears in prompts or reviews.
- Confirm this is frequent enough to justify a persistent rule.

2. Choose rule scope.

- Decide global vs repository vs path-specific scope.
- For file-targeted behavior, use path/glob constraints.

3. Draft concise instructions.

- Use action-oriented language with explicit boundaries.
- Include must and must-not behavior when relevant.

4. Add references and examples.

- Link to canonical files or templates instead of duplicating content.
- Include a short example for non-obvious workflows.

5. Check precedence and overlap.

- Verify this rule does not conflict with existing higher/lower layer rules.
- If overlap exists, split or narrow the rule.

6. Validate behavior.

- Test on realistic prompts/files in and out of scope.
- Record false positives and false negatives.

7. Refine and ship.

- Tighten scope and wording based on validation.
- Keep changes small and auditable.

## Platform Notes

### Cursor Rules

- Rule files live under `.cursor/rules/`.
- `.mdc` rules can use metadata like `description`, `globs`, and `alwaysApply`.
- Rule type behavior maps to always apply, intelligent apply, file-scoped apply, or manual mention.
- Keep rules focused and avoid duplicating what linters already enforce.

### GitHub Copilot Custom Instructions

- Repo-wide instructions: `.github/copilot-instructions.md`.
- Path-specific instructions: `.github/instructions/**/*.instructions.md`.
- Agent instruction files can include `AGENTS.md`, `CLAUDE.md`, and `GEMINI.md`.
- Keep instructions concise and broadly applicable to target scope.
- Watch precedence: personal > repo (path-specific before repo-wide) > organization.

### Codex Rules (Command Policy)

- Rules are command policy files (Starlark) under `rules/` in active config layers.
- Use strict command-prefix matching and explicit decisions (`allow`, `prompt`, `forbidden`).
- Include `match` and `not_match` examples as inline safety tests.

## Anti-Patterns

- Large monolithic rule files covering unrelated concerns.
- Rules that duplicate style guide details better enforced by tools.
- Vague wording like "follow best practices" without concrete behavior.
- Conflicting instructions across scope layers.
- Rules that cannot be validated with observable outcomes.

## Output Requirements

- Report target scope and rationale.
- Show final rule text (or file changes) and why each section exists.
- Include known conflicts checked and validation results.
- Note residual risks and next tuning step.

## Templates and Quality Gate

- Use `references/rule-authoring-templates.md` when drafting new rules.
- Use `references/rule-quality-checklist.md` before finalizing.

## Notes For This Repository

- Author source content under `.rulesync/`.
- Run `npm run generate-docs` after changes.
