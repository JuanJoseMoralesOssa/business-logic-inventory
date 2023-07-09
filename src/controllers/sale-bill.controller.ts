import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sale,
  Bill,
} from '../models';
import {SaleRepository} from '../repositories';

export class SaleBillController {
  constructor(
    @repository(SaleRepository)
    public saleRepository: SaleRepository,
  ) { }

  @get('/sales/{id}/bill', {
    responses: {
      '200': {
        description: 'Bill belonging to Sale',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bill)},
          },
        },
      },
    },
  })
  async getBill(
    @param.path.number('id') id: typeof Sale.prototype.id,
  ): Promise<Bill> {
    return this.saleRepository.bill(id);
  }
}
