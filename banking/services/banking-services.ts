import type { AccountAggregate } from "../account/account-aggregate";
import type { Domain } from "../cqrs/domain";
import { TransactionType } from "../transaction/transaction-type";
import type {
    TransactionArgs,
    DepositTransactionArgs,
    WithdrawalTransactionArgs,
    TransferTransactionArgs,
} from "../transaction/transaction-args";
interface BankingServices {
    openAccount(domain: Domain): {newAccount: AccountAggregate};

    deposit(
        domain: Domain, 
        toAccountNumber: number, 
        amount: number
    ): { toAccount: AccountAggregate };

    withdraw(
        domain: Domain, 
        fromAccountNumber: number, 
        amount: number
    ): { fromAccount: AccountAggregate };

    transfer(
        domain: Domain, 
        fromAccountNumber: number, 
        toAccountNumber: number, 
        amount: number
    ): { fromAccount: AccountAggregate, toAccount: AccountAggregate }

}

const myBankingService: BankingServices = {

    openAccount(
        domain: Domain
    ): {newAccount: AccountAggregate} {
        let {accountNumber} = domain.commandModel.createAccount();
        return {
            newAccount: domain.queryModel.getAccount(accountNumber)
        }
    },
    deposit(domain: Domain, toAccountNumber: number, amount: number): { toAccount: AccountAggregate } {
        let {transactionId} = domain.commandModel.recordTransaction<DepositTransactionArgs>(
            TransactionType.DEPOSIT, 
            { toAccountNumber });

        domain.commandModel.recordLedgerEntry(toAccountNumber, amount, transactionId);
        return {
            toAccount: domain.queryModel.getAccount(toAccountNumber)
        }
    },

    withdraw(domain: Domain, fromAccountNumber: number, amount: number): { fromAccount: AccountAggregate } {
        let {transactionId} = domain.commandModel.recordTransaction<WithdrawalTransactionArgs>(
            TransactionType.WITHDRAWAL, 
            { fromAccountNumber });

        domain.commandModel.recordLedgerEntry(fromAccountNumber, amount, transactionId);
        return {
            fromAccount: domain.queryModel.getAccount(fromAccountNumber)
        }
    },

    transfer(domain: Domain, fromAccountNumber: number, toAccountNumber: number, amount: number): { fromAccount: AccountAggregate, toAccount: AccountAggregate } {
        let {transactionId} = domain.commandModel.recordTransaction<TransferTransactionArgs>(
            TransactionType.TRANSFER, 
            { fromAccountNumber, toAccountNumber });

        domain.commandModel.recordLedgerEntry(fromAccountNumber, -amount, transactionId);
        domain.commandModel.recordLedgerEntry(toAccountNumber, amount, transactionId);
        return {
            fromAccount: domain.queryModel.getAccount(fromAccountNumber),
            toAccount: domain.queryModel.getAccount(toAccountNumber)
        }
    }
}

export type { BankingServices };
export { myBankingService };
