# Banking System Class Diagram

Static structure of types in `banking/` — interfaces, enum, and service implementation.

Open with **Markdown Preview** (`Cmd+Shift+V`) or paste [banking-system.mmd](./banking-system.mmd) into [mermaid.live](https://mermaid.live).

**Question:** What are the classes, attributes, operations, and relationships in the banking domain?

## Legend

| Stereotype | Meaning |
|-----------|---------|
| `<<interface>>` | TypeScript interface |
| `<<enumeration>>` | TypeScript enum |
| `<\|--` | Inheritance / extends |
| `*--` | Composition |
| `..>` | Dependency |
| `..\|>` | Realization / implements |

## Namespaces

| Namespace | Types |
|-----------|-------|
| `account` | LedgerEntry, AccountEntity, AccountAggregate |
| `transaction` | TransactionType, args, entities |
| `cqrs` | CommandModel, QueryModel, Domain |
| `services` | BankingServices, myBankingService |

```mermaid
---
title: Banking System Class Diagram
---
classDiagram
    direction TB

    namespace account {
        class LedgerEntry {
            <<interface>>
            +number accountNumber
            +Date dateTime
            +number amount
            +number transactionId
        }
        class AccountEntity {
            <<interface>>
            +number accountNumber
            +Date creationDateTime
            +number balance
        }
        class AccountAggregate {
            <<interface>>
            +AccountEntity accountEntity
            +List~LedgerEntry~ ledgerEntries
        }
    }

    namespace transaction {
        class TransactionType {
            <<enumeration>>
            DEPOSIT
            WITHDRAWAL
            TRANSFER
        }
        class TransactionArgs {
            <<interface>>
        }
        class DepositTransactionArgs {
            <<interface>>
            +number toAccountNumber
        }
        class WithdrawalTransactionArgs {
            <<interface>>
            +number fromAccountNumber
        }
        class TransferTransactionArgs {
            <<interface>>
            +number fromAccountNumber
            +number toAccountNumber
        }
        class TransactionEntity~T~ {
            <<interface>>
            +number transactionId
            +TransactionType transactionType
            +T transactionArgs
        }
        class DepositTransactionEntity {
            <<interface>>
            +TransactionType type
        }
        class WithdrawalTransactionEntity {
            <<interface>>
            +TransactionType type
        }
        class TransferTransactionEntity {
            <<interface>>
            +TransactionType type
        }
    }

    namespace cqrs {
        class CommandModel {
            <<interface>>
            +createAccount() object
            +recordTransaction(type, args) object
            +recordLedgerEntry(accountId, amount, transactionId)
        }
        class QueryModel {
            <<interface>>
            +getAccount(accountNumber) AccountAggregate
            +getTransaction(transactionId) TransactionEntity
        }
        class Domain {
            <<interface>>
            +CommandModel commandModel
            +QueryModel queryModel
        }
    }

    namespace services {
        class BankingServices {
            <<interface>>
            +openAccount(domain) object
            +deposit(domain, toAccountNumber, amount) object
            +withdraw(domain, fromAccountNumber, amount) object
            +transfer(domain, from, to, amount) object
        }
        class myBankingService {
            +openAccount(domain) object
            +deposit(domain, toAccountNumber, amount) object
            +withdraw(domain, fromAccountNumber, amount) object
            +transfer(domain, from, to, amount) object
        }
    }

    AccountAggregate *-- AccountEntity : accountEntity
    AccountAggregate *-- LedgerEntry : ledgerEntries

    TransactionArgs <|-- DepositTransactionArgs
    TransactionArgs <|-- WithdrawalTransactionArgs
    TransactionArgs <|-- TransferTransactionArgs

    TransactionEntity <|-- DepositTransactionEntity
    TransactionEntity <|-- WithdrawalTransactionEntity
    TransactionEntity <|-- TransferTransactionEntity

    DepositTransactionEntity ..> DepositTransactionArgs : transactionArgs
    WithdrawalTransactionEntity ..> WithdrawalTransactionArgs : transactionArgs
    TransferTransactionEntity ..> TransferTransactionArgs : transactionArgs
    TransactionEntity ..> TransactionType : transactionType

    Domain *-- CommandModel : commandModel
    Domain *-- QueryModel : queryModel

    CommandModel ..> TransactionArgs : recordTransaction
    CommandModel ..> TransactionType : recordTransaction
    QueryModel ..> AccountAggregate : getAccount
    QueryModel ..> TransactionEntity : getTransaction

    BankingServices ..> Domain : uses
    BankingServices ..> AccountAggregate : returns
    myBankingService ..|> BankingServices : implements

    note for AccountAggregate "Aggregate root for account bounded context"
    note for TransactionEntity "Generic over TransactionArgs subtypes"
```
