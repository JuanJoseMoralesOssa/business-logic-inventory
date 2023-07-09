import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Bill, BillRelations} from '../models';

export class BillRepository extends DefaultCrudRepository<
  Bill,
  typeof Bill.prototype.id,
  BillRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Bill, dataSource);
  }
}
