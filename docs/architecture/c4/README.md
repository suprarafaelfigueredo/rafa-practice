# Banking System — C4 Architecture

Diagrams as code for the TypeScript banking module in `banking/`.

## System of interest

**Banking System** — manages customer accounts, records transactions (deposits, withdrawals, transfers), and maintains account ledgers.

## Scope

| Level | Inside the boundary | Intentionally excluded |
|-------|---------------------|------------------------|
| **C1** | Banking System as one system; external actors and systems | Internal modules, TypeScript, CQRS |
| **C2** | Domain library, consumer channel, persistence adapters | Class-level structure, API endpoints |
| **C3** | Logical components inside the Banking Domain Library | Other containers, individual source files |
| **C4** | Public types and domain service in `banking/` | Implementation of CommandModel / QueryModel (not in repo) |

## Legend

| Style | Meaning |
|-------|---------|
| Blue (internal) | Part of the Banking System boundary |
| Gray (external) | Outside actors or not-yet-implemented adapters |
| Solid arrows | Uses / depends on / reads or writes |

## Diagram index

| Level | File | Question it answers |
|-------|------|---------------------|
| **C1** Context | [c1-system-context.mmd](./c1-system-context.mmd) | What is this system and who interacts with it? |
| **C2** Container | [c2-container.mmd](./c2-container.mmd) | What are the main building blocks and how do they communicate? |
| **C3** Component | [c3-component.mmd](./c3-component.mmd) | How is the Banking Domain Library architected internally? |
| **C4** Code | [c4-code.mmd](./c4-code.mmd) | What are the key types and how do they relate? |

## Naming consistency (C1 → C4)

| C1 / C2 | C3 / C4 |
|---------|---------|
| Banking System | Banking Domain Library |
| Customer Channel | (consumer of library) |
| Account & Ledger Store | CommandModel / QueryModel implementations |
| — | Banking Domain Service, Account Aggregate, Transaction Aggregate, CQRS Ports |

## Viewing

| Where | What to open |
|-------|----------------|
| **Cursor / VS Code preview** | [diagrams.md](./diagrams.md) — use **Preview-compatible** sections |
| **mermaid.live / GitHub** | `.mmd` files or **C4 syntax** sections in `diagrams.md` |

Cursor Markdown preview does not always support `C4Context`, `C4Container`, or `C4Component`. The flowchart fallbacks in `diagrams.md` render reliably.
