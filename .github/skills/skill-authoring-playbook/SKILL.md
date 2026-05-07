---
name: skill-authoring-playbook
description: >-
  Author, review, or refactor SKILL.md guidance for reusable AI agent skills.
  Use for scope design, trigger calibration, safety boundaries, and quality
  validation of skill authoring artifacts.
---
# Skill Authoring Playbook

Use this skill to design high-quality skills that work well across major AI agent ecosystems.

## When To Use

- Creating a new skill from scratch.
- Refactoring an existing `SKILL.md` that is too vague, too long, or mis-triggered.
- Converting repeated chat instructions into a reusable skill.
- Reviewing a skill that triggers too often, too rarely, or produces inconsistent output.

## When Not To Use

- One-off tasks that do not need reuse.
- Pure policy/rules work that belongs in project rule files rather than a skill.
- Cases where the base model already solves the task reliably without extra guidance.
- Implementing product features or fixing app runtime bugs.
- General code review tasks that do not involve skill authoring files.

## Core Principles (Cross-Agent Consensus)

1. One skill, one coherent job.
2. Put trigger intent in `description` first and make it specific.
3. Prefer instruction-only skills first; add scripts only when determinism or external tooling is required.
4. Use progressive disclosure: keep `SKILL.md` concise, move heavy references into separate files.
5. Write procedural guidance (how to solve a class of tasks), not single-instance answers.
6. Include defaults and escape hatches; avoid option menus without a default.
7. Add concrete gotchas and validation loops for fragile workflows.
8. Calibrate invocation safety: side-effectful skills should require explicit invocation.

## Portable Frontmatter Baseline

Use this baseline for maximum compatibility:

```yaml
---
name: your-skill-name
description: What this skill does, when to use it, and when not to use it.
---
```

Common optional fields across major agents (use only when needed):

- Invocation control: `disable-model-invocation`
- Scope control: `paths`
- Tool policy: `allowed-tools`
- Argument hints: `argument-hint`, `arguments`
- Extended metadata (platform-specific): `when_to_use`, `user-invocable`, `context`, `agent`, `hooks`, `compatibility`, `metadata`

If portability is a priority, avoid platform-only fields unless they are required for behavior or safety.

## Authoring Procedure

1. Extract real expertise.

- Start from a real successful task, incident, runbook, or review pattern.
- Capture project-specific conventions, failure modes, and corrections.

2. Define exact scope.

- Name the job this skill owns.
- List clear non-goals to avoid overlap with other skills.

3. Draft trigger text.

- Write `description` so natural user phrasing can match.
- Front-load high-signal keywords and explicit boundaries.

4. Design minimal core instructions.

- Use ordered, imperative steps.
- Provide one default path first; list alternatives only as fallback conditions.

5. Add reliability structure.

- Add a short `Gotchas` section for non-obvious pitfalls.
- Add a validation loop: do work, run check, fix, re-check.

6. Decide invocation mode.

- If actions are destructive or side-effectful (deploy, commit, notify), require explicit invocation.
- If the skill is pure guidance, allow model invocation.

7. Externalize heavy detail.

- Keep `SKILL.md` focused.
- Move long docs/examples/templates into `references/` or `assets/` and specify exactly when to read them.

8. Test and calibrate.

- Test both implicit and explicit invocation.
- Record false positives and false negatives.
- Tighten or relax `description`, boundaries, and steps based on trace evidence.

## Recommended Skill Structure

```md
# Skill Title

## When To Use

- Trigger A
- Trigger B

## When Not To Use

- Non-goal A

## Inputs

- Required inputs from user/context

## Procedure

1. Step 1
2. Step 2
3. Step 3

## Gotchas

- Project-specific pitfall 1
- Project-specific pitfall 2

## Validation

1. Run check command or checklist
2. If failed, fix and rerun

## Output Requirements

- Required sections/format
- Required evidence (files, commands, risks)
```

## Anti-Patterns

- Generic filler like "follow best practices" without concrete behavior.
- Huge monolithic `SKILL.md` with no progressive disclosure.
- Ambiguous scope that overlaps many unrelated tasks.
- Long lists of equal options with no default choice.
- Missing validation, especially for workflows with side effects.
- Trigger text that is broad enough to fire on unrelated requests.

## Notes For This Repository

- Edit skills under `.rulesync/skills/`.

## Quality Gate (Ship Checklist)

A skill is ready only if all are true:

- Scope is explicit and non-goals are documented.
- `description` is specific, keyword-rich, and bounded.
- Instructions are procedural and reusable.
- At least one concrete gotcha is included when relevant.
- Validation loop is present for multi-step or risky tasks.
- Side-effectful workflows are explicit-invocation only.
- Heavy references are externalized with clear load conditions.
- A small test set has been run and trigger behavior tuned.

## Starter Template

```md
---
name: <skill-name>
description: <what it does, when to use it, when not to use it>
---

# <Skill Title>

## When To Use

- <trigger phrase or situation>

## When Not To Use

- <out-of-scope>

## Inputs

- <required context>

## Procedure

1. <default step 1>
2. <default step 2>
3. <fallback condition and action>

## Gotchas

- <project-specific pitfall>

## Validation

1. <command or checklist>
2. If failed, fix and rerun.

## Output Requirements

- <format>
- <evidence>
```

## Execution Workflow (Practical)

Use this exact sequence when authoring or refactoring a skill:

1. Draft or update `SKILL.md` with clear scope, triggers, procedure, and validation.
2. Review quality using `references/skill-quality-checklist.md`.
3. Calibrate trigger behavior using `references/trigger-calibration-prompts.md`.
4. If false positives remain high, narrow description and add non-goals.
5. If false negatives remain high, add real user phrasing and trigger synonyms.

Read `references/skill-quality-checklist.md` before finalizing content.
Read `references/trigger-calibration-prompts.md` when tuning auto-invocation behavior.
