# Banking System Flows

Flowcharts for **how the banking system behaves** — each operation in `myBankingService`.

Open with **Markdown Preview** (`Cmd+Shift+V`) or paste `.mmd` files into [mermaid.live](https://mermaid.live).

C4 architecture diagrams live separately in [../c4/diagrams.md](../c4/diagrams.md).

## Flow index

| Flow | Question | File |
|------|----------|------|
| Open account | How is a new account opened? | [open-account.mmd](./open-account.mmd) |
| Deposit | How does a deposit work? | [deposit.mmd](./deposit.mmd) |
| Withdrawal | How does a withdrawal work? | [withdraw.mmd](./withdraw.mmd) |
| Transfer | How does a transfer work? | [transfer.mmd](./transfer.mmd) |

## Legend

| Color | Step type |
|-------|-----------|
| Dark blue (stadium) | Customer trigger / result |
| Blue | CommandModel (write side) |
| Light blue | QueryModel (read side) |

---

## Open account

**Question:** How is a new account opened?

```mermaid
---
title: Open account flow
---
flowchart TD
    start(["Customer requests new account"])
    create_account["CommandModel.createAccount()"]
    get_account["QueryModel.getAccount(accountNumber)"]
    finish(["Return newAccount"])

    start --> create_account
    create_account --> get_account
    get_account --> finish

    classDef event fill:#08427B,color:#fff,stroke:#052E56
    classDef command fill:#438DD5,color:#fff,stroke:#2E6295
    classDef query fill:#85BBF0,color:#000,stroke:#5A9BD5

    class start,finish event
    class create_account command
    class get_account query
```

---

## Deposit

**Question:** How does a deposit work?

```mermaid
---
title: Deposit flow
---
flowchart TD
    start(["Customer deposits cash"])
    record_tx["CommandModel.recordTransaction<br/>DEPOSIT, toAccountNumber"]
    record_ledger["CommandModel.recordLedgerEntry<br/>toAccountNumber, +amount, transactionId"]
    get_account["QueryModel.getAccount(toAccountNumber)"]
    finish(["Return toAccount"])

    start --> record_tx
    record_tx --> record_ledger
    record_ledger --> get_account
    get_account --> finish

    classDef event fill:#08427B,color:#fff,stroke:#052E56
    classDef command fill:#438DD5,color:#fff,stroke:#2E6295
    classDef query fill:#85BBF0,color:#000,stroke:#5A9BD5

    class start,finish event
    class record_tx,record_ledger command
    class get_account query
```

---

## Withdrawal

**Question:** How does a withdrawal work?

```mermaid
---
title: Withdrawal flow
---
flowchart TD
    start(["Customer withdraws cash"])
    record_tx["CommandModel.recordTransaction<br/>WITHDRAWAL, fromAccountNumber"]
    record_ledger["CommandModel.recordLedgerEntry<br/>fromAccountNumber, amount, transactionId"]
    get_account["QueryModel.getAccount(fromAccountNumber)"]
    finish(["Return fromAccount"])

    start --> record_tx
    record_tx --> record_ledger
    record_ledger --> get_account
    get_account --> finish

    classDef event fill:#08427B,color:#fff,stroke:#052E56
    classDef command fill:#438DD5,color:#fff,stroke:#2E6295
    classDef query fill:#85BBF0,color:#000,stroke:#5A9BD5

    class start,finish event
    class record_tx,record_ledger command
    class get_account query
```

---

## Transfer

**Question:** How does a transfer work?

```mermaid
---
title: Transfer flow
---
flowchart TD
    start(["Customer transfers funds"])
    record_tx["CommandModel.recordTransaction<br/>TRANSFER, fromAccountNumber, toAccountNumber"]
    debit_ledger["CommandModel.recordLedgerEntry<br/>fromAccountNumber, -amount, transactionId"]
    credit_ledger["CommandModel.recordLedgerEntry<br/>toAccountNumber, +amount, transactionId"]
    get_from["QueryModel.getAccount(fromAccountNumber)"]
    get_to["QueryModel.getAccount(toAccountNumber)"]
    finish(["Return fromAccount and toAccount"])

    start --> record_tx
    record_tx --> debit_ledger
    debit_ledger --> credit_ledger
    credit_ledger --> get_from
    get_from --> get_to
    get_to --> finish

    classDef event fill:#08427B,color:#fff,stroke:#052E56
    classDef command fill:#438DD5,color:#fff,stroke:#2E6295
    classDef query fill:#85BBF0,color:#000,stroke:#5A9BD5

    class start,finish event
    class record_tx,debit_ledger,credit_ledger command
    class get_from,get_to query
```
