import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1690985174316 implements MigrationInterface {
    name = 'Migration1690985174316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`avatar_url\` varchar(255) NOT NULL, \`date_of_birth\` datetime NOT NULL, INDEX \`IDX_3dd8bfc97e4a77c70971591bdc\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`refresh_token\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`email\``);
        await queryRunner.query(`DROP INDEX \`IDX_3dd8bfc97e4a77c70971591bdc\` ON \`profile\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
    }

}
