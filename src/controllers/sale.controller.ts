import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Remission, Sale, SaleDefault} from '../models';
import {BillRepository, ClientRepository, RemissionRepository, SaleRepository} from '../repositories';

export class SaleController {
  constructor(
    @repository(SaleRepository)
    public saleRepository: SaleRepository,
    @repository(RemissionRepository)
    public remissionRepository: RemissionRepository,
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
    @repository(BillRepository)
    public billRepository: BillRepository,
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

  @post('/sale-default')
  @response(200, {
    description: 'Sale default model instance',
    content: {'application/json': {schema: getModelSchemaRef(SaleDefault)}},
  })
  async createDefault(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SaleDefault, {
            title: 'NewSaleDefault',
            exclude: ['id'],
          }),
        },
      },
    })
    sale: Omit<SaleDefault, 'id'>,
  ): Promise<SaleDefault> {
    let remm: Remission;

    if (sale.saleDate && sale.remissionNumId && sale.clientId) {
      if (!sale.bill?.bill && !sale.remission?.remission)  {
        if (!sale.billId && !sale.remissionId) {
          const newSale = {
            saleDate: sale.saleDate,
            remissionNumId: sale.remissionNumId,
            clientId: sale.clientId,
          }
          return this.saleRepository.create(newSale);
        } else if (sale.billId) {
          const newSale = {
            saleDate: sale.saleDate,
            remissionNumId: sale.remissionNumId,
            clientId: sale.clientId,
            billId: sale.billId
          }
          return this.saleRepository.create(newSale);
        } else if (sale.remissionId) {
          const newSale = {
            saleDate: sale.saleDate,
            remissionNumId: sale.remissionNumId,
            clientId: sale.clientId,
            remissionId: sale.remissionId
          }
          return this.saleRepository.create(newSale);
        }
      } else if (sale.bill?.bill) {
        const bill = await this.billRepository.create({
          bill: sale.bill.bill
        });
        const newSale = {
          saleDate: sale.saleDate,
          remissionNumId: sale.remissionNumId,
          clientId: sale.clientId,
          billId: bill.id,
        }
        return this.saleRepository.create(newSale);
      } else if (sale.remission?.remission) {
        let rem = await (this.remissionRepository.findOne({
          where: {id: sale.remissionNumId}
        }))
        if (rem?.remission != sale.remission?.remission) {
          const remission = await this.remissionRepository.create({
            remission: sale.remission.remission
          });
          const newSale = {
          saleDate: sale.saleDate,
          remissionNumId: sale.remissionNumId,
          clientId: sale.clientId,
          remissionId: remission.id,
          }
          return this.saleRepository.create(newSale);
        }
        const newSale = {
          saleDate: sale.saleDate,
          remissionNumId: sale.remissionNumId,
          clientId: sale.clientId,
          remissionId: sale.remissionNumId,
        }
        return this.saleRepository.create(newSale);
      }
    }


    if (sale.saleDate) {
      if (!sale.remissionNumId && !sale.clientId) {
        if (sale.remissionNum?.remission && sale.client?.clientName) {
          remm = await this.remissionRepository.create({
            remission: sale.remissionNum.remission,
          })
          sale.remissionNumId = remm.id;

          sale.clientId = await (await this.clientRepository.create({
            clientName: sale.client.clientName,
          })).getId();
        }
      }

      if (!sale.remissionNumId && sale.clientId) {
        if (sale.remissionNum?.remission) {
          remm = await this.remissionRepository.create({
            remission: sale.remissionNum.remission,
          })
          sale.remissionNumId = remm.id;
        }
      }

      if (sale.remissionNumId && !sale.clientId) {
        if (sale.client?.clientName) {
          sale.clientId = await (await this.clientRepository.create({
            clientName: sale.client.clientName,
          })).getId();
        }
      }

      if (!sale.bill?.bill && !sale.remission?.remission)  {
            if (!sale.billId && !sale.remissionId) {
              const newSale = {
                saleDate: sale.saleDate,
                remissionNumId: sale.remissionNumId,
                clientId: sale.clientId,
              }
              return this.saleRepository.create(newSale);
            } else if (sale.billId) {
              const newSale = {
                saleDate: sale.saleDate,
                remissionNumId: sale.remissionNumId,
                clientId: sale.clientId,
                billId: sale.billId
              }
              return this.saleRepository.create(newSale);
            } else if (sale.remissionId) {
              const newSale = {
                saleDate: sale.saleDate,
                remissionNumId: sale.remissionNumId,
                clientId: sale.clientId,
                remissionId: sale.remissionId
              }
              return this.saleRepository.create(newSale);
            }
          } else if (sale.bill?.bill) {
            const bill = await this.billRepository.create({
              bill: sale.bill.bill
            })
            const newSale = {
              saleDate: sale.saleDate,
              remissionNumId: sale.remissionNumId,
              clientId: sale.clientId,
              billId: bill.id,
            }
            return this.saleRepository.create(newSale);
          } else if (sale.remission?.remission) {
            let remm = await (this.remissionRepository.findOne({
              where: {id: sale.remissionNumId}
            }))
            if (remm?.remission != sale.remission?.remission) {
              const remission = await this.remissionRepository.create({
                remission: sale.remission.remission
              });
              const newSale = {
                saleDate: sale.saleDate,
                remissionNumId: sale.remissionNumId,
                clientId: sale.clientId,
                remissionId: remission.id,
              }
              return this.saleRepository.create(newSale);
            }
        const newSale = {
          saleDate: sale.saleDate,
          remissionNumId: sale.remissionNumId,
          clientId: sale.clientId,
          remissionId: sale?.remissionNumId,
        }
        return this.saleRepository.create(newSale);
      }
    }
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

  @put('/sale-default/{id}')
  @response(204, {
    description: 'Sale default PUT success',
  })
  async replaceDefaultById(
    @param.path.number('id') id: number,
    @requestBody() sale: SaleDefault,
  ): Promise<void> {

    if (!sale.remissionNumId) {
      if (sale.remissionNum?.remission) {
        let remNum = await this.remissionRepository.create({
          remission: sale.remissionNum.remission
        });
        sale.remissionNumId = remNum.id;
      }
    }

    if (!sale.clientId) {
      if (sale.client?.clientName) {
        let client = await this.clientRepository.create({
          clientName: sale.client.clientName
        });
        sale.clientId = client.id;
      }
    }

    if (!sale.billId && sale.bill?.bill) {
      const bill = await this.billRepository.create({
        bill: sale.bill.bill,
      });
      const newSale = {
        saleDate: sale.saleDate,
        remissionNumId: sale.remissionNumId,
        clientId: sale.clientId,
        billId: bill.id,
      }
      await this.saleRepository.replaceById(id, newSale);

    } else if (!sale.remissionId && sale.remission?.remission) {

      let remission = await this.remissionRepository.
      findOne({
        where: {remission : sale.remissionNumId}
      });

      if (remission) {
        if (remission.remission == sale.remission?.remission) {
          const newSale = {
            saleDate: sale.saleDate,
            remissionNumId: sale.remissionNumId,
            clientId: sale.clientId,
            remissionId: sale.remissionNumId,
          }
          await this.saleRepository.replaceById(id, newSale);
        }
      }

      remission = await this.remissionRepository.create({
        remission: sale.remission.remission,
      });
      const newSale = {
        saleDate: sale.saleDate,
        remissionNumId: sale.remissionNumId,
        clientId: sale.clientId,
        remissionId: remission.id,
      }
      await this.saleRepository.replaceById(id, newSale);
    }

    if (sale.billId) {
      const newSale = {
        saleDate: sale.saleDate,
        remissionNumId: sale.remissionNumId,
        clientId: sale.clientId,
        billId: sale.billId,
      }
      await this.saleRepository.replaceById(id, newSale);
    } else if (sale.remissionId) {
      const newSale = {
        saleDate: sale.saleDate,
        remissionNumId: sale.remissionNumId,
        clientId: sale.clientId,
        remissionId: sale.remissionId,
      }
      await this.saleRepository.replaceById(id, newSale);
    }
  }

  @del('/sale/{id}')
  @response(204, {
    description: 'Sale DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.saleRepository.deleteById(id);
  }
}
