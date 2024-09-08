import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    db.schema
        .createTable("subscriptions")
        .ifNotExists()
        .addColumn("id", "bigint", col => col.autoIncrement().primaryKey())
        .addColumn("email", "varchar(255)", col => col.notNull().unique())
        .addColumn("created_at", "timestamp", col => col.notNull().defaultTo(sql`current_timestamp()`))
        .addColumn("updated_at", "timestamp", col => col.notNull().defaultTo(sql`current_timestamp() on update current_timestamp()`))
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    db.schema.dropTable("subscriptions").execute()
}
