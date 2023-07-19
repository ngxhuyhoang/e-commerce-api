import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1689003647736 implements MigrationInterface {
    name = 'Migration1689003647736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`display_name\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`account_id\` int NULL, INDEX \`IDX_cace4a159ff9f2512dd4237376\` (\`id\`), UNIQUE INDEX \`REL_6acfec7285fdf9f463462de3e9\` (\`account_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`refresh_token\` varchar(255) NULL, INDEX \`IDX_54115ee388cdb6d86bb4bf5b2e\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_6acfec7285fdf9f463462de3e9f\` FOREIGN KEY (\`account_id\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_6acfec7285fdf9f463462de3e9f\``);
        await queryRunner.query(`DROP INDEX \`IDX_54115ee388cdb6d86bb4bf5b2e\` ON \`account\``);
        await queryRunner.query(`DROP TABLE \`account\``);
        await queryRunner.query(`DROP INDEX \`REL_6acfec7285fdf9f463462de3e9\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_cace4a159ff9f2512dd4237376\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
