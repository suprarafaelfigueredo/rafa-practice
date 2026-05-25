import type { TransactionType } from "../transaction/transaction-type";
import type { TransactionArgs } from "../transaction/transaction-args";

interface CommandModel {
    createAccount(): {accountNumber: number};
    recordTransaction<T extends TransactionArgs>(
        transactionType: TransactionType, 
        transactionArgs: T
    ): {transactionId: number};
    recordLedgerEntry(
        accountId: number,
        amount: number,
        transactionId: number
    ): void;
}

export type { CommandModel };
