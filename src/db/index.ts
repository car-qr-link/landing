import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 3306),
    username: process.env.DB_USERNAME || 'car-qr-link/landing',
    password: process.env.DB_PASSWORD || 'car-qr-link/landing',
    database: process.env.DB_NAME || 'car-qr-link/landing',
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    synchronize: process.env.NODE_ENV !== 'production',

    migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
    migrationsRun: process.env.NODE_ENV === 'production',
};

const dataSource = new DataSource(dataSourceOptions as unknown as DataSourceOptions);

export default dataSource;