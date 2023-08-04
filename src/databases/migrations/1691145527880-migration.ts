import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691145527880 implements MigrationInterface {
    name = 'Migration1691145527880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, INDEX \`IDX_920331560282b8bd21bb02290d\` (\`id\`), INDEX \`IDX_24e1a752c9819ac155c6efe889\` (\`is_deleted\`), INDEX \`IDX_48ce552495d14eae9b187bb671\` (\`name\`), INDEX \`IDX_94b0c1df9c647ac7f26e989318\` (\`description\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`name\``);
        await queryRunner.query(`DROP INDEX \`IDX_94b0c1df9c647ac7f26e989318\` ON \`permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_48ce552495d14eae9b187bb671\` ON \`permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_24e1a752c9819ac155c6efe889\` ON \`permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_920331560282b8bd21bb02290d\` ON \`permissions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }

}
