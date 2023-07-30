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
  Remission,
} from '../models';
import {SaleRepository} from '../repositories';

export class SaleRemissionController {
  constructor(
    @repository(SaleRepository)
    public saleRepository: SaleRepository,
  ) { }

  @get('/sales/{id}/remission', {
    responses: {
      '200': {
        description: 'Remission belonging to Sale',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Remission)},
          },
        },
      },
    },
  })
  async getRemission(
    @param.path.number('id') id: typeof Sale.prototype.id,
  ): Promise<Remission> {
    return this.saleRepository.remissionNum(id);
  }
}
