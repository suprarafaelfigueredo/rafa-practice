# Banking System Architecture

## C4 model (structure)

What the system **is** — context, containers, components, and types.

| Level | Preview |
|-------|---------|
| C1–C4 | [c4/diagrams.md](./c4/diagrams.md) |

## System flows (behavior)

What the system **does** — step-by-step flows for each banking operation.

| Flow | File |
|------|------|
| All flows | [flowcharts/diagrams.md](./flowcharts/diagrams.md) |
| Open account | [flowcharts/open-account.mmd](./flowcharts/open-account.mmd) |
| Deposit | [flowcharts/deposit.mmd](./flowcharts/deposit.mmd) |
| Withdrawal | [flowcharts/withdraw.mmd](./flowcharts/withdraw.mmd) |
| Transfer | [flowcharts/transfer.mmd](./flowcharts/transfer.mmd) |

## Class diagram (structure)

Types, attributes, operations, and relationships in `banking/`.

| Preview | File |
|---------|------|
| All | [class-diagram/diagrams.md](./class-diagram/diagrams.md) |
| Source | [class-diagram/banking-system.mmd](./class-diagram/banking-system.mmd) |

## ERD (data model)

Persisted entities, attributes, and relationships.

| Preview | File |
|---------|------|
| All | [erd/diagrams.md](./erd/diagrams.md) |
| Source | [erd/banking-system.mmd](./erd/banking-system.mmd) |

## Sequence diagrams (interactions)

Message order between participants for each operation.

| Preview | File |
|---------|------|
| All | [sequence/diagrams.md](./sequence/diagrams.md) |
| Open account | [sequence/open-account.mmd](./sequence/open-account.mmd) |
| Deposit | [sequence/deposit.mmd](./sequence/deposit.mmd) |
| Withdrawal | [sequence/withdraw.mmd](./sequence/withdraw.mmd) |
| Transfer | [sequence/transfer.mmd](./sequence/transfer.mmd) |

## State diagrams (behavior states)

States and transitions for accounts, transactions, and operations.

| Preview | File |
|---------|------|
| All | [state/diagrams.md](./state/diagrams.md) |
| Account lifecycle | [state/account-lifecycle.mmd](./state/account-lifecycle.mmd) |
| Transaction processing | [state/transaction-processing.mmd](./state/transaction-processing.mmd) |
| Banking operation | [state/banking-operation.mmd](./state/banking-operation.mmd) |
| Transaction type | [state/transaction-type.mmd](./state/transaction-type.mmd) |

Flows are derived from `myBankingService` in `banking/services/banking-services.ts`.
