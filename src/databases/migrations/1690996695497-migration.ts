import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1690996695497 implements MigrationInterface {
    name = 'Migration1690996695497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`first_name\` \`first_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`last_name\` \`last_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`avatar_url\` \`avatar_url\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`avatar_url\` \`avatar_url\` varchar(255) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`last_name\` \`last_name\` varchar(255) NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`first_name\` \`first_name\` varchar(255) NULL DEFAULT ''`);
    }

}
