import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Packing, PackingRelations} from '../models';

export class PackingRepository extends DefaultCrudRepository<
  Packing,
  typeof Packing.prototype.id,
  PackingRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Packing, dataSource);
  }
}
