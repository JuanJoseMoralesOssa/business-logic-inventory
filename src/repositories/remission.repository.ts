import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Remission, RemissionRelations, Sale} from '../models';
import {SaleRepository} from './sale.repository';

export class RemissionRepository extends DefaultCrudRepository<
  Remission,
  typeof Remission.prototype.id,
  RemissionRelations
> {

  public readonly sale: HasOneRepositoryFactory<Sale, typeof Remission.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SaleRepository') protected saleRepositoryGetter: Getter<SaleRepository>,
  ) {
    super(Remission, dataSource);
    this.sale = this.createHasOneRepositoryFactoryFor('sale', saleRepositoryGetter);
    this.registerInclusionResolver('sale', this.sale.inclusionResolver);
  }
}
