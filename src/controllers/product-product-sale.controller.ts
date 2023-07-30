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
  Product,
  ProductSale,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductProductSaleController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/product-sales', {
    responses: {
      '200': {
        description: 'Array of Product has many ProductSale',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductSale)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProductSale>,
  ): Promise<ProductSale[]> {
    return this.productRepository.productSales(id).find(filter);
  }

  @post('/products/{id}/product-sales', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductSale)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductSale, {
            title: 'NewProductSaleInProduct',
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) productSale: Omit<ProductSale, 'id'>,
  ): Promise<ProductSale> {
    return this.productRepository.productSales(id).create(productSale);
  }

  @patch('/products/{id}/product-sales', {
    responses: {
      '200': {
        description: 'Product.ProductSale PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductSale, {partial: true}),
        },
      },
    })
    productSale: Partial<ProductSale>,
    @param.query.object('where', getWhereSchemaFor(ProductSale)) where?: Where<ProductSale>,
  ): Promise<Count> {
    return this.productRepository.productSales(id).patch(productSale, where);
  }

  @del('/products/{id}/product-sales', {
    responses: {
      '200': {
        description: 'Product.ProductSale DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductSale)) where?: Where<ProductSale>,
  ): Promise<Count> {
    return this.productRepository.productSales(id).delete(where);
  }
}
