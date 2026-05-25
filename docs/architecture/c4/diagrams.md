# Banking System C4 Diagrams

Open this file and use **Markdown Preview** (`Cmd+Shift+V`).

Cursor preview may not render `C4Context` diagrams. Use the **Preview-compatible** sections below, or paste `.mmd` files into [mermaid.live](https://mermaid.live).

---

## C1 - System Context

**Question:** What is this system and who interacts with it?

### C4 syntax (mermaid.live / GitHub)

```mermaid
C4Context
  title System Context diagram for Banking System

  Person(customer, "Bank Customer", "Opens accounts and moves money through deposits, withdrawals, and transfers.")
  Person(operator, "Bank Operator", "Uses banking operations on behalf of the institution or for support.")

  System(banking, "Banking System", "Manages customer accounts, records monetary transactions, and maintains account ledgers.")

  System_Ext(channel, "Customer Channel", "Web, mobile, or branch applications through which customers initiate banking actions.")
  SystemDb_Ext(store, "Account and Ledger Store", "Persists accounts, transactions, and ledger entries.")

  Rel(customer, channel, "Initiates banking actions through")
  Rel(operator, banking, "Performs account and transaction operations via")
  Rel(channel, banking, "Requests account operations from")
  Rel(banking, store, "Records and retrieves account data via")
```

### Preview-compatible

```mermaid
flowchart LR
  customer(["Bank Customer"])
  operator(["Bank Operator"])
  channel["Customer Channel"]
  banking["Banking System"]
  store[("Account and Ledger Store")]

  customer -->|Initiates banking actions through| channel
  operator -->|Performs account and transaction operations via| banking
  channel -->|Requests account operations from| banking
  banking -->|Records and retrieves account data via| store
```

---

## C2 - Container

**Question:** What are the main building blocks and how do they communicate?

### C4 syntax (mermaid.live / GitHub)

```mermaid
C4Container
  title Container diagram for Banking System

  Person(customer, "Bank Customer", "Initiates deposits, withdrawals, transfers, and account opening.")
  System_Ext(channel, "Customer Channel", "Web, mobile, or branch front-end. Future consumer of the domain library.")
  SystemDb_Ext(store, "Account and Ledger Store", "Database or external core banking.")

  Container_Boundary(banking_boundary, "Banking System") {
    Container(domain_lib, "Banking Domain Library", "TypeScript Module", "Domain model, CQRS ports, and banking use cases.")
    Container_Ext(cmd_adapter, "Command Side Adapter", "TypeScript Module", "Implements CommandModel. Not in repo.")
    Container_Ext(qry_adapter, "Query Side Adapter", "TypeScript Module", "Implements QueryModel. Not in repo.")
  }

  Rel(customer, channel, "Uses")
  Rel(channel, domain_lib, "Invokes banking operations via")
  Rel(domain_lib, cmd_adapter, "Records changes through")
  Rel(domain_lib, qry_adapter, "Reads state through")
  Rel(cmd_adapter, store, "Writes accounts and ledger entries to")
  Rel(qry_adapter, store, "Reads accounts and transactions from")
```

### Preview-compatible

```mermaid
flowchart TB
  customer(["Bank Customer"])
  channel["Customer Channel"]
  store[("Account and Ledger Store")]

  subgraph banking_system ["Banking System"]
    domain_lib["Banking Domain Library<br/>TypeScript Module"]
    cmd_adapter["Command Side Adapter<br/>CommandModel impl"]
    qry_adapter["Query Side Adapter<br/>QueryModel impl"]
  end

  customer -->|Uses| channel
  channel -->|Invokes banking operations via| domain_lib
  domain_lib -->|Records changes through| cmd_adapter
  domain_lib -->|Reads state through| qry_adapter
  cmd_adapter -->|Writes accounts and ledger entries to| store
  qry_adapter -->|Reads accounts and transactions from| store
```

---

## C3 - Component

**Question:** How is the Banking Domain Library architected internally?

### C4 syntax (mermaid.live / GitHub)

```mermaid
C4Component
  title Component diagram for Banking Domain Library

  Container_Ext(channel, "Customer Channel", "Web, mobile, or branch", "Invokes banking operations.")
  ContainerDb_Ext(store, "Account and Ledger Store", "Database", "Persists accounts and ledger data.")

  Container_Boundary(domain_lib, "Banking Domain Library") {
    Component(banking_service, "Banking Domain Service", "TypeScript", "Orchestrates openAccount, deposit, withdraw, and transfer.")
    Component(cqrs_ports, "CQRS Domain Facade", "TypeScript", "Bundles CommandModel and QueryModel as Domain.")
    Component(command_port, "Command Port", "TypeScript", "createAccount, recordTransaction, recordLedgerEntry.")
    Component(query_port, "Query Port", "TypeScript", "getAccount, getTransaction.")
    Component(account_agg, "Account Aggregate", "TypeScript", "AccountEntity, LedgerEntry, AccountAggregate.")
    Component(transaction_agg, "Transaction Aggregate", "TypeScript", "TransactionType, args, and entities.")
  }

  Rel(channel, banking_service, "Calls")
  Rel(banking_service, cqrs_ports, "Uses")
  Rel(banking_service, transaction_agg, "References types from")
  Rel(cqrs_ports, command_port, "Composes")
  Rel(cqrs_ports, query_port, "Composes")
  Rel(command_port, transaction_agg, "Uses types from")
  Rel(query_port, account_agg, "Returns")
  Rel(query_port, transaction_agg, "Returns")
  Rel(command_port, store, "Persists via adapter")
  Rel(query_port, store, "Reads via adapter")
```

### Preview-compatible

```mermaid
flowchart TB
  channel["Customer Channel"]
  store[("Account and Ledger Store")]

  subgraph domain_lib ["Banking Domain Library"]
    banking_service["Banking Domain Service"]
    cqrs_ports["CQRS Domain Facade"]
    command_port["Command Port"]
    query_port["Query Port"]
    account_agg["Account Aggregate"]
    transaction_agg["Transaction Aggregate"]
  end

  channel -->|Calls| banking_service
  banking_service -->|Uses| cqrs_ports
  banking_service -->|References types from| transaction_agg
  cqrs_ports -->|Composes| command_port
  cqrs_ports -->|Composes| query_port
  command_port -->|Uses types from| transaction_agg
  query_port -->|Returns| account_agg
  query_port -->|Returns| transaction_agg
  command_port -->|Persists via adapter| store
  query_port -->|Reads via adapter| store
```

---

## C4 - Code

**Question:** What are the key types and how do they relate?

```mermaid
classDiagram
  direction TB
  class BankingServices {
    openAccount()
    deposit()
    withdraw()
    transfer()
  }
  class myBankingService
  class Domain {
    commandModel
    queryModel
  }
  class CommandModel {
    createAccount()
    recordTransaction()
    recordLedgerEntry()
  }
  class QueryModel {
    getAccount()
    getTransaction()
  }
  class AccountAggregate {
    accountEntity
    ledgerEntries
  }
  class AccountEntity {
    accountNumber
    creationDateTime
    balance
  }
  class LedgerEntry {
    accountNumber
    dateTime
    amount
    transactionId
  }
  class TransactionType {
    DEPOSIT
    WITHDRAWAL
    TRANSFER
  }
  class TransactionArgs
  class DepositTransactionArgs {
    toAccountNumber
  }
  class WithdrawalTransactionArgs {
    fromAccountNumber
  }
  class TransferTransactionArgs {
    fromAccountNumber
    toAccountNumber
  }
  class TransactionEntity {
    transactionId
    transactionType
    transactionArgs
  }
  class DepositTransactionEntity {
    type
  }
  class WithdrawalTransactionEntity {
    type
  }
  class TransferTransactionEntity {
    type
  }
  myBankingService ..|> BankingServices
  BankingServices ..> Domain
  Domain *-- CommandModel
  Domain *-- QueryModel
  AccountAggregate *-- AccountEntity
  AccountAggregate *-- LedgerEntry
  TransactionArgs <|-- DepositTransactionArgs
  TransactionArgs <|-- WithdrawalTransactionArgs
  TransactionArgs <|-- TransferTransactionArgs
  TransactionEntity <|-- DepositTransactionEntity
  TransactionEntity <|-- WithdrawalTransactionEntity
  TransactionEntity <|-- TransferTransactionEntity
  DepositTransactionEntity ..> DepositTransactionArgs
  WithdrawalTransactionEntity ..> WithdrawalTransactionArgs
  TransferTransactionEntity ..> TransferTransactionArgs
  TransactionEntity ..> TransactionType
  CommandModel ..> TransactionArgs
  CommandModel ..> TransactionType
  QueryModel ..> AccountAggregate
  QueryModel ..> TransactionEntity
  BankingServices ..> AccountAggregate
```
