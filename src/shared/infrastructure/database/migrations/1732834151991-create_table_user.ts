import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUser1732834151991 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const isTableExists = await queryRunner.hasTable('user');

    if (!isTableExists) {
      await queryRunner.createTable(
        new Table({
          name: 'user',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'username',
              type: 'int',
              length: '50',
              isNullable: false,
              isUnique: true
            },
            {
              name: 'password',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              length: '255',
              isNullable: false,
              isUnique: true
            },
            {
              name: 'rolesId',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'active',
              type: 'bit',
              isNullable: false,
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
          foreignKeys: [
            {
              columnNames: ['rolesId'],
              referencedTableName: 'roles',
              referencedColumnNames: ['id'],
            },
          ]
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
