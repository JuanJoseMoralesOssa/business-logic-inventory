import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ProductSale, ProductSaleRelations, Sale, Product} from '../models';
import {SaleRepository} from './sale.repository';
import {ProductRepository} from './product.repository';

export class ProductSaleRepository extends DefaultCrudRepository<
  ProductSale,
  typeof ProductSale.prototype.id,
  ProductSaleRelations
> {

  public readonly sale: BelongsToAccessor<Sale, typeof ProductSale.prototype.id>;

  public readonly product: BelongsToAccessor<Product, typeof ProductSale.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SaleRepository') protected saleRepositoryGetter: Getter<SaleRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(ProductSale, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.sale = this.createBelongsToAccessorFor('sale', saleRepositoryGetter,);
    this.registerInclusionResolver('sale', this.sale.inclusionResolver);
  }
}
