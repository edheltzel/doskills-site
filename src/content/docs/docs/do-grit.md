---
title: do-grit (opt-in)
description: Opt-in use of grit, GitButler's Rust Git client, for read-only JSON inspection. Changes stay on git or but.
---

`do-grit` is an opt-in skill in the workflow pack. It covers [grit](https://grit-scm.com/docs/skill/), a Git client and library written in Rust by GitButler (pre-1.0). Grit uses the same `.git`, pack format and remotes as git, so grit and git can be mixed on one branch.

**grit ≠ but.** Grit is a git client, not a GitButler client. It works alongside `but` and does not replace it.

## When agents use it

- Only when `grit` is installed **and** you or the repo contract asked for it. Otherwise agents use the normal `git` / `but` path in `do-commit`.
- For read-only inspection (`status`, `log`, `diff`, `show`) with `--json`.
- Changes, commits, pushes, lanes and stacks stay on `git` or `but`. Agents never run `grit commit` on a GitButler workspace; grit refuses there anyway.

## Installing grit

Agents never install grit. If you want it, install it yourself. The documented install is:

```sh
curl -fsSL https://grit-scm.com/install | sh
```

It supports macOS and Linux, installs to `~/.local/bin`, and needs glibc 2.34+.

The vendor `grit` skill is generated per machine from the installed binary and is never committed to Do-Skills:

```sh
mkdir -p .agents/skills/grit && grit skill > .agents/skills/grit/SKILL.md
```

Regenerate it after every `grit update`.

## Pointers in the git-flow skills

Each git-flow skill now carries a one-line pointer to `do-grit`:

| Skill | Pointer |
|-------|---------|
| `do-commit` | Never `grit commit` on a GitButler workspace. Commit with `but` or `git`. |
| `do-git-safe-pr-workflow` | grit does not replace the `but` verbs or the git safety steps. |
| `do-git-worktree` | `grit worktree` follows the same no-worktree policy. |
| `do-gh-stack` | Stacks stay on `but` / `gh`. Do not toggle `grit.changeIds` in shared repos without the maintainer's call. |
| `do-work` | Git changes go through `do-commit`. grit is never the default. |
