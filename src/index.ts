import app from "./app";
import config from "./config";
import migrator from "./db/migrator";
import logger from "./logger";

async function main() {
    const port = config.port;

    const migrationResults = await migrator.migrateToLatest();
    if (migrationResults.error) {
        logger.error(migrationResults.error, 'Migration failed');
        process.exit(1);
    } else {
        logger.info(migrationResults.results, 'Migration successful');
    }

    app.listen(port, () => {
        logger.info(`Listening on port ${port}`);
    });
};

main().catch(console.error);
