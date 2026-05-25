import { TransactionType } from "./transaction-type";
import type {
    TransactionArgs,
    DepositTransactionArgs,
    WithdrawalTransactionArgs,
    TransferTransactionArgs,
} from "./transaction-args";

interface TransactionEntity<T extends TransactionArgs> {
    transactionId: number;
    transactionType: TransactionType;
    transactionArgs: T;
}

interface DepositTransactionEntity extends TransactionEntity<DepositTransactionArgs> {
    type: TransactionType.DEPOSIT;
}

interface WithdrawalTransactionEntity extends TransactionEntity<WithdrawalTransactionArgs> {
    type: TransactionType.WITHDRAWAL;
}

interface TransferTransactionEntity extends TransactionEntity<TransferTransactionArgs> {
    type: TransactionType.TRANSFER;
}

export type {
    TransactionEntity,
    DepositTransactionEntity,
    WithdrawalTransactionEntity,
    TransferTransactionEntity,
};
