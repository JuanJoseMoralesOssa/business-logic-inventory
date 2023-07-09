import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ProductSale, ProductSaleRelations} from '../models';

export class ProductSaleRepository extends DefaultCrudRepository<
  ProductSale,
  typeof ProductSale.prototype.id,
  ProductSaleRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ProductSale, dataSource);
  }
}
