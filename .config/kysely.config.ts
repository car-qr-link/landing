import {
	MysqlAdapter,
	MysqlDriver,
	MysqlIntrospector,
	MysqlQueryCompiler
} from 'kysely'
import { defineConfig } from 'kysely-ctl'
import { createPool } from 'mysql2'

export default defineConfig({
	// replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
	dialect: {
		createAdapter() {
			return new MysqlAdapter()
		},
		createDriver() {
			return new MysqlDriver({
				pool: createPool(process.env.DATABASE_URL!),
			})
		},
		createIntrospector(db) {
			return new MysqlIntrospector(db)
		},
		createQueryCompiler() {
			return new MysqlQueryCompiler()
		},
	},
	migrations: {
		migrationFolder: "src/db/migrations",
	},
	//   plugins: [],
	//   seeds: {
	//     seedFolder: "seeds",
	//   }
})
