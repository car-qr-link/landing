import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";
import config from "../config";
import { DB } from "./types";

const db = new Kysely<DB>({
    dialect: new MysqlDialect({
        pool: createPool(config.db.url),
    }),
});

export default db;
