import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1691228122233 implements MigrationInterface {
  name = 'Migration1691228122233';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`carts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`product_id\` int NOT NULL, \`quantity\` int NOT NULL, INDEX \`IDX_b5f695a59f5ebb50af3c816081\` (\`id\`), INDEX \`IDX_1cbecd0ac01d13fb488f742fc4\` (\`is_deleted\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, INDEX \`IDX_0806c755e0aca124e67c0cf6d7\` (\`id\`), INDEX \`IDX_21ba1fd3e61583222b585e73e6\` (\`is_deleted\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`CREATE INDEX \`IDX_532caf92d4c175d5682fa7c7e7\` ON \`profile\` (\`avatar_url\`)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_532caf92d4c175d5682fa7c7e7\` ON \`profile\``);
    await queryRunner.query(`DROP INDEX \`IDX_21ba1fd3e61583222b585e73e6\` ON \`products\``);
    await queryRunner.query(`DROP INDEX \`IDX_0806c755e0aca124e67c0cf6d7\` ON \`products\``);
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(`DROP INDEX \`IDX_1cbecd0ac01d13fb488f742fc4\` ON \`carts\``);
    await queryRunner.query(`DROP INDEX \`IDX_b5f695a59f5ebb50af3c816081\` ON \`carts\``);
    await queryRunner.query(`DROP TABLE \`carts\``);
  }
}
