interface LedgerEntry {
    accountNumber: number;
    dateTime: Date; 
    amount: number;
    transactionId: number;
}

export type { LedgerEntry };
