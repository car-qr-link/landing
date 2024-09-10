import { promises as fs } from 'fs';
import { FileMigrationProvider, Migrator } from "kysely";
import * as path from 'path';

import db from ".";

const migrator = new Migrator({
    db: db,
    provider: new FileMigrationProvider({
        fs,
        path,
        // This needs to be an absolute path.
        migrationFolder: path.join(__dirname, 'migrations'),
    }),
});

export default migrator;