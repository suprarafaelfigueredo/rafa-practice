import type { CommandModel } from "./command-model";
import type { QueryModel } from "./query-model";

interface Domain {
    commandModel: CommandModel;
    queryModel: QueryModel;
}

export type { Domain };
