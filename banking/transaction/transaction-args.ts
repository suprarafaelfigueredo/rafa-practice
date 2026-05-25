interface TransactionArgs {

}

interface DepositTransactionArgs extends TransactionArgs {
    toAccountNumber: number;
}

interface WithdrawalTransactionArgs extends TransactionArgs {
    fromAccountNumber: number;
}

interface TransferTransactionArgs extends TransactionArgs {
    fromAccountNumber: number;
    toAccountNumber: number;
}

export type {
    TransactionArgs,
    DepositTransactionArgs,
    WithdrawalTransactionArgs,
    TransferTransactionArgs,
};
