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
  Sale,
} from '../models';
import {ProductSaleRepository} from '../repositories';

export class ProductSaleSaleController {
  constructor(
    @repository(ProductSaleRepository)
    public productSaleRepository: ProductSaleRepository,
  ) { }

  @get('/product-sales/{id}/sale', {
    responses: {
      '200': {
        description: 'Sale belonging to ProductSale',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sale)},
          },
        },
      },
    },
  })
  async getSale(
    @param.path.number('id') id: typeof ProductSale.prototype.id,
  ): Promise<Sale> {
    return this.productSaleRepository.sale(id);
  }
}
