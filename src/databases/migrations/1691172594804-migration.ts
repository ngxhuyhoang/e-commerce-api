import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1691172594804 implements MigrationInterface {
  name = 'Migration1691172594804';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`refresh_token\` varchar(255) NOT NULL, INDEX \`IDX_54115ee388cdb6d86bb4bf5b2e\` (\`id\`), INDEX \`IDX_25d7313fdd4ca5244304825b91\` (\`is_deleted\`), INDEX \`IDX_4c8f96ccf523e9a3faefd5bdd4\` (\`email\`), INDEX \`IDX_1810939ed60edf0bce9545523b\` (\`refresh_token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(255) NOT NULL, \`account_id\` int NULL, INDEX \`IDX_c1433d71a4838793a49dcad46a\` (\`id\`), INDEX \`IDX_750caed017f424cffd2dfb0d64\` (\`is_deleted\`), INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`first_name\` varchar(255) NULL, \`last_name\` varchar(255) NULL, \`avatar_url\` varchar(255) NULL, \`date_of_birth\` datetime NULL, \`account_id\` int NULL, INDEX \`IDX_3dd8bfc97e4a77c70971591bdc\` (\`id\`), INDEX \`IDX_212257107ac6250d29afa73a43\` (\`is_deleted\`), INDEX \`IDX_8fe96f23833f524e653a5ddeb6\` (\`first_name\`), INDEX \`IDX_70ba8f02ea95a55982b5b1edec\` (\`last_name\`), INDEX \`IDX_77c374da3e9f2d81bee3f1f734\` (\`date_of_birth\`), UNIQUE INDEX \`REL_a39874be76793f8a9be22dcf4d\` (\`account_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, INDEX \`IDX_920331560282b8bd21bb02290d\` (\`id\`), INDEX \`IDX_24e1a752c9819ac155c6efe889\` (\`is_deleted\`), INDEX \`IDX_48ce552495d14eae9b187bb671\` (\`name\`), INDEX \`IDX_94b0c1df9c647ac7f26e989318\` (\`description\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` ADD CONSTRAINT \`FK_1f71aa0d3259185d8ffd063433f\` FOREIGN KEY (\`account_id\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a39874be76793f8a9be22dcf4df\` FOREIGN KEY (\`account_id\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a39874be76793f8a9be22dcf4df\``);
    await queryRunner.query(`ALTER TABLE \`roles\` DROP FOREIGN KEY \`FK_1f71aa0d3259185d8ffd063433f\``);
    await queryRunner.query(`DROP INDEX \`IDX_94b0c1df9c647ac7f26e989318\` ON \`permissions\``);
    await queryRunner.query(`DROP INDEX \`IDX_48ce552495d14eae9b187bb671\` ON \`permissions\``);
    await queryRunner.query(`DROP INDEX \`IDX_24e1a752c9819ac155c6efe889\` ON \`permissions\``);
    await queryRunner.query(`DROP INDEX \`IDX_920331560282b8bd21bb02290d\` ON \`permissions\``);
    await queryRunner.query(`DROP TABLE \`permissions\``);
    await queryRunner.query(`DROP INDEX \`REL_a39874be76793f8a9be22dcf4d\` ON \`profile\``);
    await queryRunner.query(`DROP INDEX \`IDX_77c374da3e9f2d81bee3f1f734\` ON \`profile\``);
    await queryRunner.query(`DROP INDEX \`IDX_70ba8f02ea95a55982b5b1edec\` ON \`profile\``);
    await queryRunner.query(`DROP INDEX \`IDX_8fe96f23833f524e653a5ddeb6\` ON \`profile\``);
    await queryRunner.query(`DROP INDEX \`IDX_212257107ac6250d29afa73a43\` ON \`profile\``);
    await queryRunner.query(`DROP INDEX \`IDX_3dd8bfc97e4a77c70971591bdc\` ON \`profile\``);
    await queryRunner.query(`DROP TABLE \`profile\``);
    await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
    await queryRunner.query(`DROP INDEX \`IDX_750caed017f424cffd2dfb0d64\` ON \`roles\``);
    await queryRunner.query(`DROP INDEX \`IDX_c1433d71a4838793a49dcad46a\` ON \`roles\``);
    await queryRunner.query(`DROP TABLE \`roles\``);
    await queryRunner.query(`DROP INDEX \`IDX_1810939ed60edf0bce9545523b\` ON \`account\``);
    await queryRunner.query(`DROP INDEX \`IDX_4c8f96ccf523e9a3faefd5bdd4\` ON \`account\``);
    await queryRunner.query(`DROP INDEX \`IDX_25d7313fdd4ca5244304825b91\` ON \`account\``);
    await queryRunner.query(`DROP INDEX \`IDX_54115ee388cdb6d86bb4bf5b2e\` ON \`account\``);
    await queryRunner.query(`DROP TABLE \`account\``);
  }
}
