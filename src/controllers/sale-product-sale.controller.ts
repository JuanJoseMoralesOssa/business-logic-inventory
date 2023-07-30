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
  Sale,
  ProductSale,
} from '../models';
import {SaleRepository} from '../repositories';

export class SaleProductSaleController {
  constructor(
    @repository(SaleRepository) protected saleRepository: SaleRepository,
  ) { }

  @get('/sales/{id}/product-sales', {
    responses: {
      '200': {
        description: 'Array of Sale has many ProductSale',
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
    return this.saleRepository.productSales(id).find(filter);
  }

  @post('/sales/{id}/product-sales', {
    responses: {
      '200': {
        description: 'Sale model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductSale)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Sale.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductSale, {
            title: 'NewProductSaleInSale',
            exclude: ['id'],
            optional: ['saleId']
          }),
        },
      },
    }) productSale: Omit<ProductSale, 'id'>,
  ): Promise<ProductSale> {
    return this.saleRepository.productSales(id).create(productSale);
  }

  @patch('/sales/{id}/product-sales', {
    responses: {
      '200': {
        description: 'Sale.ProductSale PATCH success count',
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
    return this.saleRepository.productSales(id).patch(productSale, where);
  }

  @del('/sales/{id}/product-sales', {
    responses: {
      '200': {
        description: 'Sale.ProductSale DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductSale)) where?: Where<ProductSale>,
  ): Promise<Count> {
    return this.saleRepository.productSales(id).delete(where);
  }
}
