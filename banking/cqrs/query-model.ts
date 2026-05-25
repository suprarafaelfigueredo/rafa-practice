import type { AccountAggregate } from "../account/account-aggregate";
import type { TransactionEntity } from "../transaction/transaction-entity";
import type { TransactionArgs } from "../transaction/transaction-args";

interface QueryModel {
    getAccount(accountNumber: number): AccountAggregate;
    getTransaction(transactionId: string): TransactionEntity<TransactionArgs>;
}

export type { QueryModel };
