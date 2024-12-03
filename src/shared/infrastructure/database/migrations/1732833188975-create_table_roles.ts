import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableRoles1732833188975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isTableExists = await queryRunner.hasTable('roles');

    if (!isTableExists) {
      await queryRunner.createTable(
        new Table({
          name: 'roles',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'name',
              type: 'varchar',
              length: '50',
              isNullable: false,
              isUnique: true
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
              onUpdate: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'deletedAt',
              type: 'timestamp',
              isNullable: true
            },
          ],
        }),
      );
    }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
