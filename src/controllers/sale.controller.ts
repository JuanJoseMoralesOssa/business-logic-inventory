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
import {Sale} from '../models';
import {SaleRepository} from '../repositories';

export class SaleController {
  constructor(
    @repository(SaleRepository)
    public saleRepository : SaleRepository,
  ) {}

  @post('/sale')
  @response(200, {
    description: 'Sale model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sale)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sale, {
            title: 'NewSale',
            exclude: ['id'],
          }),
        },
      },
    })
    sale: Omit<Sale, 'id'>,
  ): Promise<Sale> {
    return this.saleRepository.create(sale);
  }

  @get('/sale/count')
  @response(200, {
    description: 'Sale model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sale) where?: Where<Sale>,
  ): Promise<Count> {
    return this.saleRepository.count(where);
  }

  @get('/sale')
  @response(200, {
    description: 'Array of Sale model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sale, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sale) filter?: Filter<Sale>,
  ): Promise<Sale[]> {
    return this.saleRepository.find(filter);
  }

  @get('/sale-relations')
  @response(200, {
    description: 'Array of Sale model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sale, {includeRelations: true}),
        },
      },
    },
  })
  async findWithRelations(
  ): Promise<Sale[]> {
    return this.saleRepository.find(
      {
        include: [
          {relation: "remissionNum"},
          {relation: "remission"},
          {relation: "productSales", scope: {include: [{relation: "product"}]}},
          {relation: "bill"},
          {relation: "client"},
          {relation: "products"},
        ]
      });
  }

  @patch('/sale')
  @response(200, {
    description: 'Sale PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sale, {partial: true}),
        },
      },
    })
    sale: Sale,
    @param.where(Sale) where?: Where<Sale>,
  ): Promise<Count> {
    return this.saleRepository.updateAll(sale, where);
  }

  @get('/sale/{id}')
  @response(200, {
    description: 'Sale model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sale, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Sale, {exclude: 'where'}) filter?: FilterExcludingWhere<Sale>
  ): Promise<Sale> {
    return this.saleRepository.findById(id, filter);
  }

  @patch('/sale/{id}')
  @response(204, {
    description: 'Sale PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sale, {partial: true}),
        },
      },
    })
    sale: Sale,
  ): Promise<void> {
    await this.saleRepository.updateById(id, sale);
  }

  @put('/sale/{id}')
  @response(204, {
    description: 'Sale PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sale: Sale,
  ): Promise<void> {
    await this.saleRepository.replaceById(id, sale);
  }

  @del('/sale/{id}')
  @response(204, {
    description: 'Sale DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.saleRepository.deleteById(id);
  }
}
