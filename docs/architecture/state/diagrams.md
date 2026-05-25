# Banking System State Diagrams

State machines describing behavior in the banking domain.

Open with **Markdown Preview** (`Cmd+Shift+V`) or paste `.mmd` files into [mermaid.live](https://mermaid.live).

**Question:** What states can the system be in, and what events cause transitions?

Derived from `myBankingService` and domain entities in `banking/`.

## Diagram index

| Diagram | Question | File |
|---------|----------|------|
| Account lifecycle | What states can an account be in? | [account-lifecycle.mmd](./account-lifecycle.mmd) |
| Transaction processing | What states does a transaction go through? | [transaction-processing.mmd](./transaction-processing.mmd) |
| Banking operation | How does the service move between idle and complete? | [banking-operation.mmd](./banking-operation.mmd) |
| Transaction type | How do deposit, withdrawal, and transfer differ? | [transaction-type.mmd](./transaction-type.mmd) |

---

## Account lifecycle

**Question:** What states can an account be in?

```mermaid
---
title: Account lifecycle
---
stateDiagram-v2
    direction LR

    [*] --> NonExistent
    NonExistent --> Created : openAccount / createAccount
    Created --> Active : getAccount
    Active --> Active : deposit
    Active --> Active : withdraw
    Active --> Active : transfer

    note right of Created
        Account exists with
        accountNumber and
        creationDateTime
    end note

    note right of Active
        Balance updated via
        ledger entries
    end note

    classDef created fill:#85BBF0,color:#000
    classDef active fill:#1168BD,color:#fff

    class Created created
    class Active active
```

---

## Transaction processing lifecycle

**Question:** What states does a monetary operation pass through?

```mermaid
---
title: Transaction processing lifecycle
---
stateDiagram-v2
    direction TB

    [*] --> Initiated
    Initiated --> Recorded : recordTransaction
    Recorded --> LedgerUpdated : recordLedgerEntry
    LedgerUpdated --> LedgerUpdated : transfer second ledger entry
    LedgerUpdated --> AccountRead : getAccount
    AccountRead --> AccountRead : transfer second getAccount
    AccountRead --> Completed
    Completed --> [*]

    note right of Recorded
        TRANSACTION persisted
        with transactionId and type
    end note

    note right of LedgerUpdated
        LEDGER_ENTRY rows posted
        to affected accounts
    end note

    classDef write fill:#438DD5,color:#fff
    classDef read fill:#85BBF0,color:#000
    classDef done fill:#08427B,color:#fff

    class Initiated,Recorded,LedgerUpdated write
    class AccountRead read
    class Completed done
```

---

## Banking operation state machine

**Question:** How does the banking service move from idle to complete?

```mermaid
---
title: Banking operation state machine
---
stateDiagram-v2
    direction TB

    [*] --> Idle

    Idle --> CreatingAccount : openAccount
    CreatingAccount --> AccountReady : createAccount
    AccountReady --> Complete : getAccount

    Idle --> Processing : deposit / withdraw / transfer

    state Processing {
        [*] --> RecordingTransaction
        RecordingTransaction --> PostingLedger : recordTransaction

        state PostingLedger {
            [*] --> SingleLedgerEntry
            SingleLedgerEntry --> DualLedgerEntry : transfer
            SingleLedgerEntry --> LedgerComplete : deposit or withdraw
            DualLedgerEntry --> LedgerComplete : second recordLedgerEntry
            LedgerComplete --> [*]
        }

        PostingLedger --> ReadingAccounts : ledger posted

        state ReadingAccounts {
            [*] --> ReadOneAccount
            ReadOneAccount --> ReadTwoAccounts : transfer
            ReadOneAccount --> ReadComplete : deposit or withdraw
            ReadTwoAccounts --> ReadComplete : second getAccount
            ReadComplete --> [*]
        }

        ReadingAccounts --> [*]
    }

    Processing --> Complete
    Complete --> Idle
    Complete --> [*]

    note right of Processing
        CommandModel writes then
        QueryModel reads result
    end note

    classDef idle fill:#eee,color:#000
    classDef command fill:#438DD5,color:#fff
    classDef complete fill:#08427B,color:#fff

    class Idle idle
    class CreatingAccount,Processing command
    class Complete complete
```

---

## Transaction type states

**Question:** How do deposit, withdrawal, and transfer paths differ?

```mermaid
---
title: Transaction type states
---
stateDiagram-v2
    direction LR

    [*] --> OperationSelected

    state OperationSelected <<choice>>
    OperationSelected --> DepositFlow : deposit
    OperationSelected --> WithdrawalFlow : withdraw
    OperationSelected --> TransferFlow : transfer

    state DepositFlow {
        [*] --> DepositRecorded
        DepositRecorded --> DepositLedgerPosted : credit toAccount
        DepositLedgerPosted --> DepositComplete : getAccount toAccount
        DepositComplete --> [*]
    }

    state WithdrawalFlow {
        [*] --> WithdrawalRecorded
        WithdrawalRecorded --> WithdrawalLedgerPosted : debit fromAccount
        WithdrawalLedgerPosted --> WithdrawalComplete : getAccount fromAccount
        WithdrawalComplete --> [*]
    }

    state TransferFlow {
        [*] --> TransferRecorded
        TransferRecorded --> TransferDebitPosted : debit fromAccount
        TransferDebitPosted --> TransferCreditPosted : credit toAccount
        TransferCreditPosted --> TransferAccountsRead : getAccount from and to
        TransferAccountsRead --> [*]
    }

    DepositFlow --> [*]
    WithdrawalFlow --> [*]
    TransferFlow --> [*]

    classDef deposit fill:#85BBF0,color:#000
    classDef withdraw fill:#438DD5,color:#fff
    classDef transfer fill:#1168BD,color:#fff

    class DepositFlow deposit
    class WithdrawalFlow withdraw
    class TransferFlow transfer
```
