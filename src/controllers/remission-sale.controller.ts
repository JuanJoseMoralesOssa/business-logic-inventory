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
  Remission,
  Sale,
} from '../models';
import {RemissionRepository} from '../repositories';

export class RemissionSaleController {
  constructor(
    @repository(RemissionRepository) protected remissionRepository: RemissionRepository,
  ) { }

  @get('/remissions/{id}/sale', {
    responses: {
      '200': {
        description: 'Remission has one Sale',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sale),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Sale>,
  ): Promise<Sale> {
    return this.remissionRepository.sale(id).get(filter);
  }

  @post('/remissions/{id}/sale', {
    responses: {
      '200': {
        description: 'Remission model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sale)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Remission.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sale, {
            title: 'NewSaleInRemission',
            exclude: ['id'],
            optional: ['remissionId']
          }),
        },
      },
    }) sale: Omit<Sale, 'id'>,
  ): Promise<Sale> {
    return this.remissionRepository.sale(id).create(sale);
  }

  @patch('/remissions/{id}/sale', {
    responses: {
      '200': {
        description: 'Remission.Sale PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sale, {partial: true}),
        },
      },
    })
    sale: Partial<Sale>,
    @param.query.object('where', getWhereSchemaFor(Sale)) where?: Where<Sale>,
  ): Promise<Count> {
    return this.remissionRepository.sale(id).patch(sale, where);
  }

  @del('/remissions/{id}/sale', {
    responses: {
      '200': {
        description: 'Remission.Sale DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Sale)) where?: Where<Sale>,
  ): Promise<Count> {
    return this.remissionRepository.sale(id).delete(where);
  }
}
