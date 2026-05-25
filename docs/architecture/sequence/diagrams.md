# Banking System Sequence Diagrams

Interaction diagrams for each operation in `myBankingService`.

Open with **Markdown Preview** (`Cmd+Shift+V`) or paste `.mmd` files into [mermaid.live](https://mermaid.live).

**Question:** In what order do participants interact for each banking operation?

## Participants

| Participant | Role |
|-------------|------|
| **Customer** | Initiates the operation |
| **BankingService** | `myBankingService` — orchestrates the use case |
| **CommandModel** | Write side — accounts, transactions, ledger entries |
| **QueryModel** | Read side — account aggregates |
| **Store** | Account and ledger persistence (not implemented in repo) |

## Diagram index

| Operation | File |
|-----------|------|
| Open account | [open-account.mmd](./open-account.mmd) |
| Deposit | [deposit.mmd](./deposit.mmd) |
| Withdrawal | [withdraw.mmd](./withdraw.mmd) |
| Transfer | [transfer.mmd](./transfer.mmd) |

---

## Open account

```mermaid
---
title: Open account sequence
---
sequenceDiagram
    autonumber
    actor Customer
    participant BankingService
    participant CommandModel
    participant QueryModel
    participant Store@{ "type": "database" }

    Customer->>+BankingService: openAccount(domain)
    BankingService->>+CommandModel: createAccount()
    CommandModel->>+Store: persist new account
    Store-->>-CommandModel: accountNumber
    CommandModel-->>-BankingService: accountNumber
    BankingService->>+QueryModel: getAccount(accountNumber)
    QueryModel->>+Store: read account and ledger
    Store-->>-QueryModel: AccountAggregate
    QueryModel-->>-BankingService: AccountAggregate
    BankingService-->>-Customer: newAccount
```

---

## Deposit

```mermaid
---
title: Deposit sequence
---
sequenceDiagram
    autonumber
    actor Customer
    participant BankingService
    participant CommandModel
    participant QueryModel
    participant Store@{ "type": "database" }

    Customer->>+BankingService: deposit(domain, toAccountNumber, amount)
    BankingService->>+CommandModel: recordTransaction(DEPOSIT, toAccountNumber)
    CommandModel->>+Store: persist transaction
    Store-->>-CommandModel: transactionId
    CommandModel-->>-BankingService: transactionId
    BankingService->>+CommandModel: recordLedgerEntry(toAccountNumber, amount, transactionId)
    CommandModel->>+Store: persist ledger entry
    Store-->>-CommandModel: ok
    CommandModel-->>-BankingService: ok
    BankingService->>+QueryModel: getAccount(toAccountNumber)
    QueryModel->>+Store: read account and ledger
    Store-->>-QueryModel: AccountAggregate
    QueryModel-->>-BankingService: AccountAggregate
    BankingService-->>-Customer: toAccount
```

---

## Withdrawal

```mermaid
---
title: Withdrawal sequence
---
sequenceDiagram
    autonumber
    actor Customer
    participant BankingService
    participant CommandModel
    participant QueryModel
    participant Store@{ "type": "database" }

    Customer->>+BankingService: withdraw(domain, fromAccountNumber, amount)
    BankingService->>+CommandModel: recordTransaction(WITHDRAWAL, fromAccountNumber)
    CommandModel->>+Store: persist transaction
    Store-->>-CommandModel: transactionId
    CommandModel-->>-BankingService: transactionId
    BankingService->>+CommandModel: recordLedgerEntry(fromAccountNumber, amount, transactionId)
    CommandModel->>+Store: persist ledger entry
    Store-->>-CommandModel: ok
    CommandModel-->>-BankingService: ok
    BankingService->>+QueryModel: getAccount(fromAccountNumber)
    QueryModel->>+Store: read account and ledger
    Store-->>-QueryModel: AccountAggregate
    QueryModel-->>-BankingService: AccountAggregate
    BankingService-->>-Customer: fromAccount
```

---

## Transfer

```mermaid
---
title: Transfer sequence
---
sequenceDiagram
    autonumber
    actor Customer
    participant BankingService
    participant CommandModel
    participant QueryModel
    participant Store@{ "type": "database" }

    Customer->>+BankingService: transfer(domain, fromAccountNumber, toAccountNumber, amount)
    BankingService->>+CommandModel: recordTransaction(TRANSFER, from, to)
    CommandModel->>+Store: persist transaction
    Store-->>-CommandModel: transactionId
    CommandModel-->>-BankingService: transactionId
    BankingService->>+CommandModel: recordLedgerEntry(fromAccountNumber, -amount, transactionId)
    CommandModel->>+Store: persist debit ledger entry
    Store-->>-CommandModel: ok
    CommandModel-->>-BankingService: ok
    BankingService->>+CommandModel: recordLedgerEntry(toAccountNumber, amount, transactionId)
    CommandModel->>+Store: persist credit ledger entry
    Store-->>-CommandModel: ok
    CommandModel-->>-BankingService: ok
    BankingService->>+QueryModel: getAccount(fromAccountNumber)
    QueryModel->>+Store: read source account
    Store-->>-QueryModel: fromAccount
    QueryModel-->>-BankingService: fromAccount
    BankingService->>+QueryModel: getAccount(toAccountNumber)
    QueryModel->>+Store: read target account
    Store-->>-QueryModel: toAccount
    QueryModel-->>-BankingService: toAccount
    BankingService-->>-Customer: fromAccount, toAccount
```
