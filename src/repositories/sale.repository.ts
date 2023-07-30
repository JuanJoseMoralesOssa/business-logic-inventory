import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sale, SaleRelations, Client, Product, ProductSale, Bill, Remission} from '../models';
import {ClientRepository} from './client.repository';
import {ProductSaleRepository} from './product-sale.repository';
import {ProductRepository} from './product.repository';
import {BillRepository} from './bill.repository';
import {RemissionRepository} from './remission.repository';

export class SaleRepository extends DefaultCrudRepository<
  Sale,
  typeof Sale.prototype.id,
  SaleRelations
> {

  public readonly client: BelongsToAccessor<Client, typeof Sale.prototype.id>;

  public readonly products: HasManyThroughRepositoryFactory<Product, typeof Product.prototype.id,
          ProductSale,
          typeof Sale.prototype.id
        >;

  public readonly bill: BelongsToAccessor<Bill, typeof Sale.prototype.id>;

  public readonly remission: BelongsToAccessor<Remission, typeof Sale.prototype.id>;

  public readonly productSales: HasManyRepositoryFactory<ProductSale, typeof Sale.prototype.id>;

  public readonly remissionNum: BelongsToAccessor<Remission, typeof Sale.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('ProductSaleRepository') protected productSaleRepositoryGetter: Getter<ProductSaleRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('BillRepository') protected billRepositoryGetter: Getter<BillRepository>, @repository.getter('RemissionRepository') protected remissionRepositoryGetter: Getter<RemissionRepository>,
  ) {
    super(Sale, dataSource);
    this.remissionNum = this.createBelongsToAccessorFor('remissionNum', remissionRepositoryGetter,);
    this.registerInclusionResolver('remissionNum', this.remissionNum.inclusionResolver);
    this.productSales = this.createHasManyRepositoryFactoryFor('productSales', productSaleRepositoryGetter,);
    this.registerInclusionResolver('productSales', this.productSales.inclusionResolver);
    this.remission = this.createBelongsToAccessorFor('remission', remissionRepositoryGetter,);
    this.registerInclusionResolver('remission', this.remission.inclusionResolver);
    this.bill = this.createBelongsToAccessorFor('bill', billRepositoryGetter,);
    this.registerInclusionResolver('bill', this.bill.inclusionResolver);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productRepositoryGetter, productSaleRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
  }
}
