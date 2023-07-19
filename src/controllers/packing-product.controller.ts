import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Packing,
  Product,
} from '../models';
import {PackingRepository} from '../repositories';

export class PackingProductController {
  constructor(
    @repository(PackingRepository) protected packingRepository: PackingRepository,
  ) { }

  @get('/packings/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Packing has many Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    let idint = parseInt(id);
    return this.packingRepository.products(idint).find(filter);
  }

  @post('/packings/{id}/products', {
    responses: {
      '200': {
        description: 'Packing model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Packing.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInPacking',
            exclude: ['id'],
            optional: ['packingId']
          }),
        },
      },
    }) product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.packingRepository.products(id).create(product);
  }

  @patch('/packings/{id}/products', {
    responses: {
      '200': {
        description: 'Packing.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    let idint = parseInt(id);
    return this.packingRepository.products(idint).patch(product, where);
  }

  @del('/packings/{id}/products', {
    responses: {
      '200': {
        description: 'Packing.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    let idint = parseInt(id);
    return this.packingRepository.products(idint).delete(where);
  }
}
