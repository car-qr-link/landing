import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1726289192948 implements MigrationInterface {
    name = 'Initial1726289192948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`subscriptions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`email\` varchar(128) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_f0558bf43d14f66844255e8b7c\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f0558bf43d14f66844255e8b7c\` ON \`subscriptions\``);
        await queryRunner.query(`DROP TABLE \`subscriptions\``);
    }

}
