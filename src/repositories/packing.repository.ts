import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Packing, PackingRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class PackingRepository extends DefaultCrudRepository<
  Packing,
  typeof Packing.prototype.id,
  PackingRelations
> {

  public readonly products: HasManyRepositoryFactory<Product, typeof Packing.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Packing, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
