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
import {Remission} from '../models';
import {RemissionRepository} from '../repositories';
import {log} from 'console';

export class RemissionController {
  constructor(
    @repository(RemissionRepository)
    public remissionRepository : RemissionRepository,
  ) {}

  @post('/remission')
  @response(200, {
    description: 'Remission model instance',
    content: {'application/json': {schema: getModelSchemaRef(Remission)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Remission, {
            title: 'NewRemission',
            exclude: ['id'],
          }),
        },
      },
    })
    remission: Omit<Remission, 'id'>,
  ): Promise<Remission> {
    return this.remissionRepository.create(remission);
  }

  @get('/remission/count')
  @response(200, {
    description: 'Remission model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Remission) where?: Where<Remission>,
  ): Promise<Count> {
    return this.remissionRepository.count(where);
  }

  @get('/remission')
  @response(200, {
    description: 'Array of Remission model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Remission, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Remission) filter?: Filter<Remission>,
  ): Promise<Remission[]> {
    return this.remissionRepository.find(filter);
  }

  @get('/remission-relations')
  @response(200, {
    description: 'Array of Remission model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Remission, {includeRelations: true}),
        },
      },
    },
  })
  async findWithRelations(
  ): Promise<Remission[]> {
      return this.remissionRepository.find(
      {
        include: [
          {relation: "sale"},
        ]
      });
  }

  @patch('/remission')
  @response(200, {
    description: 'Remission PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Remission, {partial: true}),
        },
      },
    })
    remission: Remission,
    @param.where(Remission) where?: Where<Remission>,
  ): Promise<Count> {
    return this.remissionRepository.updateAll(remission, where);
  }

  @get('/remission/{id}')
  @response(200, {
    description: 'Remission model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Remission, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Remission, {exclude: 'where'}) filter?: FilterExcludingWhere<Remission>
  ): Promise<Remission> {
    return this.remissionRepository.findById(id, filter);
  }

  @patch('/remission/{id}')
  @response(204, {
    description: 'Remission PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Remission, {partial: true}),
        },
      },
    })
    remission: Remission,
  ): Promise<void> {
    await this.remissionRepository.updateById(id, remission);
  }

  @put('/remission/{id}')
  @response(204, {
    description: 'Remission PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() remission: Remission,
  ): Promise<void> {
    await this.remissionRepository.replaceById(id, remission);
  }

  @del('/remission/{id}')
  @response(204, {
    description: 'Remission DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.remissionRepository.deleteById(id);
  }
}
