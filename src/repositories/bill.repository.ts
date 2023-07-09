import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Bill, BillRelations, Sale} from '../models';
import {SaleRepository} from './sale.repository';

export class BillRepository extends DefaultCrudRepository<
  Bill,
  typeof Bill.prototype.id,
  BillRelations
> {

  public readonly sale: HasOneRepositoryFactory<Sale, typeof Bill.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SaleRepository') protected saleRepositoryGetter: Getter<SaleRepository>,
  ) {
    super(Bill, dataSource);
    this.sale = this.createHasOneRepositoryFactoryFor('sale', saleRepositoryGetter);
    this.registerInclusionResolver('sale', this.sale.inclusionResolver);
  }
}
