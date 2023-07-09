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
  Bill,
  Sale,
} from '../models';
import {BillRepository} from '../repositories';

export class BillSaleController {
  constructor(
    @repository(BillRepository) protected billRepository: BillRepository,
  ) { }

  @get('/bills/{id}/sale', {
    responses: {
      '200': {
        description: 'Bill has one Sale',
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
    return this.billRepository.sale(id).get(filter);
  }

  @post('/bills/{id}/sale', {
    responses: {
      '200': {
        description: 'Bill model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sale)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Bill.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sale, {
            title: 'NewSaleInBill',
            exclude: ['id'],
            optional: ['billId']
          }),
        },
      },
    }) sale: Omit<Sale, 'id'>,
  ): Promise<Sale> {
    return this.billRepository.sale(id).create(sale);
  }

  @patch('/bills/{id}/sale', {
    responses: {
      '200': {
        description: 'Bill.Sale PATCH success count',
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
    return this.billRepository.sale(id).patch(sale, where);
  }

  @del('/bills/{id}/sale', {
    responses: {
      '200': {
        description: 'Bill.Sale DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Sale)) where?: Where<Sale>,
  ): Promise<Count> {
    return this.billRepository.sale(id).delete(where);
  }
}
