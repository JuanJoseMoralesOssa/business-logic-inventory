import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Remission, RemissionRelations, Sale} from '../models';

export class RemissionRepository extends DefaultCrudRepository<
  Remission,
  typeof Remission.prototype.id,
  RemissionRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Remission, dataSource);
  }
}
