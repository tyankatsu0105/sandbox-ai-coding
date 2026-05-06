# Rule Authoring Templates

Use these templates as starting points, then adapt to your repository.

## Cursor .mdc Rule (File Scoped)

```md
---
description: Conventions for React components in src/components
globs: src/components/**/*.tsx
alwaysApply: false
---

- Use named exports for components.
- Keep component files focused; extract subcomponents when file size grows.
- Place related styles next to component files.
```

## Cursor .mdc Rule (Intelligent Apply)

```md
---
description: Backend service conventions for request validation and error shape
alwaysApply: false
---

- Validate request inputs at service boundaries.
- Return structured errors with code and message.
- Reference `templates/service-template.ts` for new services.
```

## Copilot Repo-Wide Instructions

Path: `.github/copilot-instructions.md`

```md
# Repository Instructions

## Project context

- This repository uses TypeScript and Next.js.

## Coding conventions

- Prefer explicit return types on exported functions.
- Keep API handlers focused and validate inputs.

## References

- API conventions: docs/api-conventions.md
```

## Copilot Path-Specific Instructions

Path: `.github/instructions/frontend.instructions.md`

```md
---
applyTo: "app/**/*.tsx"
---

- Use server components by default; add `use client` only when needed.
- Keep page-level data fetching in server context when possible.
```

## Codex Command Policy Rule

```python
prefix_rule(
    pattern = ["gh", "pr", "view"],
    decision = "prompt",
    justification = "Viewing PRs is allowed with approval",
    match = [
        "gh pr view 100",
    ],
    not_match = [
        "gh pr list",
    ],
)
```
