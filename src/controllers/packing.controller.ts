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
import {Packing} from '../models';
import {PackingRepository} from '../repositories';

export class PackingController {
  constructor(
    @repository(PackingRepository)
    public packingRepository : PackingRepository,
  ) {}

  @post('/packing')
  @response(200, {
    description: 'Packing model instance',
    content: {'application/json': {schema: getModelSchemaRef(Packing)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Packing, {
            title: 'NewPacking',
            exclude: ['id'],
          }),
        },
      },
    })
    packing: Omit<Packing, 'id'>,
  ): Promise<Packing> {
    return this.packingRepository.create(packing);
  }

  @get('/packing/count')
  @response(200, {
    description: 'Packing model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Packing) where?: Where<Packing>,
  ): Promise<Count> {
    return this.packingRepository.count(where);
  }

  @get('/packing')
  @response(200, {
    description: 'Array of Packing model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Packing, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Packing) filter?: Filter<Packing>,
  ): Promise<Packing[]> {
    return this.packingRepository.find(filter);
  }

  @get('/packing-relations')
  @response(200, {
    description: 'Array of Packing model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Packing, {includeRelations: true}),
        },
      },
    },
  })
  async findWithRelations(
  ): Promise<Packing[]> {
    return this.packingRepository.find(
      {
        include: [
          {relation: "products"}
        ]
      });
  }

  @patch('/packing')
  @response(200, {
    description: 'Packing PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Packing, {partial: true}),
        },
      },
    })
    packing: Packing,
    @param.where(Packing) where?: Where<Packing>,
  ): Promise<Count> {
    return this.packingRepository.updateAll(packing, where);
  }

  @get('/packing/{id}')
  @response(200, {
    description: 'Packing model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Packing, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Packing, {exclude: 'where'}) filter?: FilterExcludingWhere<Packing>
  ): Promise<Packing> {
    return this.packingRepository.findById(id, filter);
  }

  @patch('/packing/{id}')
  @response(204, {
    description: 'Packing PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Packing, {partial: true}),
        },
      },
    })
    packing: Packing,
  ): Promise<void> {
    await this.packingRepository.updateById(id, packing);
  }

  @put('/packing/{id}')
  @response(204, {
    description: 'Packing PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() packing: Packing,
  ): Promise<void> {
    await this.packingRepository.replaceById(id, packing);
  }

  @del('/packing/{id}')
  @response(204, {
    description: 'Packing DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.packingRepository.deleteById(id);
  }
}
