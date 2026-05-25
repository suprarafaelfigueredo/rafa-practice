import type { AccountEntity } from "./account-entity";
import type { LedgerEntry } from "./ledger-entry";

interface AccountAggregate {
    accountEntity: AccountEntity;
    ledgerEntries: LedgerEntry[];
}

export type { AccountAggregate };
