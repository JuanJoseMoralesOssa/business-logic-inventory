import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Product,
  Packing,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductPackingController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/packing', {
    responses: {
      '200': {
        description: 'Packing belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Packing)},
          },
        },
      },
    },
  })
  async getPacking(
    @param.path.number('id') id: typeof Product.prototype.id,
  ): Promise<Packing> {
    return this.productRepository.packing(id);
  }
}
