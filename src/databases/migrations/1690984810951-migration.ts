import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1690984810951 implements MigrationInterface {
    name = 'Migration1690984810951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`is_deleted\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`refresh_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`email\` varchar(255) NOT NULL`);
    }

}
