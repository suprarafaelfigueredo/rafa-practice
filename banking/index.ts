/**
 * Ubiquitous Language:
 * Account = list of ledger entries
 * Account Number = a unique identifier of an account
 * Credit = An operation of adding funds to an account
 * Debit = An operation of deducting funds from an account
 * Ledger Entry = A record of a credit or debit in an account
 * Ledger = A historical list of ledger entries for an account
 * Deposit = A an operation of customer adding cash to their account
 * Withdrawal = An operation of customer removing cash from their account
 * Transfer = An operation of moving funds from one account to another
 * Amount = a monetary amount in USD currency, with decimal precision of 2
 */

export type {
    LedgerEntry,
    AccountEntity,
    AccountAggregate,
} from "./account";

export {
    TransactionType,
} from "./transaction";
export type {
    TransactionArgs,
    DepositTransactionArgs,
    WithdrawalTransactionArgs,
    TransferTransactionArgs,
    TransactionEntity,
    DepositTransactionEntity,
    WithdrawalTransactionEntity,
    TransferTransactionEntity,
} from "./transaction";

export type {
    CommandModel,
    QueryModel,
    Domain,
} from "./cqrs";

export type { BankingServices } from "./services";
export { myBankingService } from "./services";
