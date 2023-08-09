import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691592522396 implements MigrationInterface {
    name = 'Migration1691592522396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_and_permissions\` DROP FOREIGN KEY \`FK_58ea147c9bdfac55c0f86b646a6\``);
        await queryRunner.query(`ALTER TABLE \`roles_and_permissions\` DROP FOREIGN KEY \`FK_a976bed021fca48ed9fcb2a2e43\``);
        await queryRunner.query(`ALTER TABLE \`roles_and_permissions\` ADD CONSTRAINT \`FK_58ea147c9bdfac55c0f86b646a6\` FOREIGN KEY (\`permissions_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_and_permissions\` ADD CONSTRAINT \`FK_a976bed021fca48ed9fcb2a2e43\` FOREIGN KEY (\`roles_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_and_permissions\` DROP FOREIGN KEY \`FK_a976bed021fca48ed9fcb2a2e43\``);
        await queryRunner.query(`ALTER TABLE \`roles_and_permissions\` DROP FOREIGN KEY \`FK_58ea147c9bdfac55c0f86b646a6\``);
        await queryRunner.query(`ALTER TABLE \`roles_and_permissions\` ADD CONSTRAINT \`FK_a976bed021fca48ed9fcb2a2e43\` FOREIGN KEY (\`roles_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_and_permissions\` ADD CONSTRAINT \`FK_58ea147c9bdfac55c0f86b646a6\` FOREIGN KEY (\`permissions_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
