import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ProductSale} from '../models';
import {ProductSaleRepository} from '../repositories';

export class ProductSaleController {
  constructor(
    @repository(ProductSaleRepository)
    public productSaleRepository : ProductSaleRepository,
  ) {}

  @post('/product-sales')
  @response(200, {
    description: 'ProductSale model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductSale)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductSale, {
            title: 'NewProductSale',
            exclude: ['id'],
          }),
        },
      },
    })
    productSale: Omit<ProductSale, 'id'>,
  ): Promise<ProductSale> {
    return this.productSaleRepository.create(productSale);
  }

  @get('/product-sales/count')
  @response(200, {
    description: 'ProductSale model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductSale) where?: Where<ProductSale>,
  ): Promise<Count> {
    return this.productSaleRepository.count(where);
  }

  @get('/product-sales')
  @response(200, {
    description: 'Array of ProductSale model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductSale, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductSale) filter?: Filter<ProductSale>,
  ): Promise<ProductSale[]> {
    return this.productSaleRepository.find(filter);
  }

  @get('/product-sales-relations')
  @response(200, {
    description: 'Array of ProductSale model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductSale, {includeRelations: true}),
        },
      },
    },
  })
  async findWithRelations(
  ): Promise<ProductSale[]> {
    return this.productSaleRepository.find(
      {
        order: ['id DESC'],
        include: [
          {relation: "product"},
          {relation: "sale"},
        ]
      });
  }

  @patch('/product-sales')
  @response(200, {
    description: 'ProductSale PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductSale, {partial: true}),
        },
      },
    })
    productSale: ProductSale,
    @param.where(ProductSale) where?: Where<ProductSale>,
  ): Promise<Count> {
    return this.productSaleRepository.updateAll(productSale, where);
  }

  @get('/product-sales/{id}')
  @response(200, {
    description: 'ProductSale model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductSale, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProductSale, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductSale>
  ): Promise<ProductSale> {
    return this.productSaleRepository.findById(id, filter);
  }

  @patch('/product-sales/{id}')
  @response(204, {
    description: 'ProductSale PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductSale, {partial: true}),
        },
      },
    })
    productSale: ProductSale,
  ): Promise<void> {
    await this.productSaleRepository.updateById(id, productSale);
  }

  @put('/product-sales/{id}')
  @response(204, {
    description: 'ProductSale PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() productSale: ProductSale,
  ): Promise<void> {
    await this.productSaleRepository.replaceById(id, productSale);
  }

  @del('/product-sales/{id}')
  @response(204, {
    description: 'ProductSale DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productSaleRepository.deleteById(id);
  }
}
