import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Product, ProductRelations, Sale, ProductSale} from '../models';
import {ProductSaleRepository} from './product-sale.repository';
import {SaleRepository} from './sale.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly sales: HasManyThroughRepositoryFactory<Sale, typeof Sale.prototype.id,
          ProductSale,
          typeof Product.prototype.id
        >;

  public readonly productSales: HasManyRepositoryFactory<ProductSale, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProductSaleRepository') protected productSaleRepositoryGetter: Getter<ProductSaleRepository>, @repository.getter('SaleRepository') protected saleRepositoryGetter: Getter<SaleRepository>,
  ) {
    super(Product, dataSource);
    this.productSales = this.createHasManyRepositoryFactoryFor('productSales', productSaleRepositoryGetter,);
    this.registerInclusionResolver('productSales', this.productSales.inclusionResolver);
    this.sales = this.createHasManyThroughRepositoryFactoryFor('sales', saleRepositoryGetter, productSaleRepositoryGetter,);
    this.registerInclusionResolver('sales', this.sales.inclusionResolver);
  }
}
