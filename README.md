# Banking System

TypeScript domain module for a small banking system. It models accounts, transactions, and ledger entries, and exposes use cases for opening accounts, deposits, withdrawals, and transfers.

Persistence is defined through CQRS ports (`CommandModel`, `QueryModel`) but not implemented in this repository — the focus is domain structure, services, and architecture documentation.

## Operations

| Operation | Description |
|-----------|-------------|
| **Open account** | Creates a new account and returns the account aggregate |
| **Deposit** | Records a deposit transaction and credits the target account |
| **Withdrawal** | Records a withdrawal transaction and debits the source account |
| **Transfer** | Moves funds between two accounts with debit and credit ledger entries |

## Project structure

```
banking/
├── account/          # Account aggregate (entity, ledger entry, aggregate root)
├── transaction/      # Transaction types, args, and entities
├── cqrs/             # CommandModel, QueryModel, Domain
├── services/         # BankingServices and myBankingService
└── index.ts          # Public API

docs/architecture/    # Diagrams (C4, flows, class, ERD, sequence, state)
bankingSystem.ts      # Legacy re-export barrel
```

## Usage

Import from the banking module:

```typescript
import {
  myBankingService,
  TransactionType,
  type Domain,
  type CommandModel,
  type QueryModel,
} from "./banking";

const domain: Domain = {
  commandModel: myCommandModel, // your CommandModel implementation
  queryModel: myQueryModel,     // your QueryModel implementation
};

const { newAccount } = myBankingService.openAccount(domain);

const { toAccount } = myBankingService.deposit(domain, toAccountNumber, amount);
```

Legacy import path:

```typescript
import { myBankingService } from "./bankingSystem";
```

## Ubiquitous language

| Term | Meaning |
|------|---------|
| **Account** | A list of ledger entries with balance and metadata |
| **Account number** | Unique identifier of an account |
| **Credit** | Adding funds to an account |
| **Debit** | Deducting funds from an account |
| **Ledger entry** | A record of a credit or debit tied to a transaction |
| **Ledger** | Historical list of ledger entries for an account |
| **Deposit** | Customer adding cash to their account |
| **Withdrawal** | Customer removing cash from their account |
| **Transfer** | Moving funds from one account to another |
| **Amount** | Monetary value in USD with two decimal places |

## Architecture documentation

All diagrams live under [`docs/architecture/`](docs/architecture/README.md). Open the linked `diagrams.md` files in Markdown preview to render Mermaid charts.

| Diagram type | Purpose | Entry point |
|--------------|---------|-------------|
| **C4 model** | System structure (context → code) | [c4/diagrams.md](docs/architecture/c4/diagrams.md) |
| **Flowcharts** | Step-by-step operation flows | [flowcharts/diagrams.md](docs/architecture/flowcharts/diagrams.md) |
| **Class diagram** | Types and relationships | [class-diagram/diagrams.md](docs/architecture/class-diagram/diagrams.md) |
| **ERD** | Persisted entities and relationships | [erd/diagrams.md](docs/architecture/erd/diagrams.md) |
| **Sequence** | Message order between participants | [sequence/diagrams.md](docs/architecture/sequence/diagrams.md) |
| **State** | States and transitions | [state/diagrams.md](docs/architecture/state/diagrams.md) |

## Design notes

- **Domain-driven layout** — code is grouped by aggregate and bounded context (`account`, `transaction`), not by technical layer.
- **CQRS** — writes go through `CommandModel`; reads go through `QueryModel`. `Domain` bundles both ports for use cases.
- **Domain service** — `myBankingService` orchestrates each operation: record transaction → post ledger entry(ies) → read updated account(s).
