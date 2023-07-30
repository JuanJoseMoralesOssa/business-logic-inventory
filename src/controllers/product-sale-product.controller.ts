import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductSale,
  Product,
} from '../models';
import {ProductSaleRepository} from '../repositories';

export class ProductSaleProductController {
  constructor(
    @repository(ProductSaleRepository)
    public productSaleRepository: ProductSaleRepository,
  ) { }

  @get('/product-sales/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to ProductSale',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.number('id') id: typeof ProductSale.prototype.id,
  ): Promise<Product> {
    return this.productSaleRepository.product(id);
  }
}
