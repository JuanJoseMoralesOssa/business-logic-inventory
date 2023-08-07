import {Model, model, property} from '@loopback/repository';
import {Client} from './client.model';
import {Bill} from './bill.model';
import {Remission} from './remission.model';

@model()
export class SaleDefault extends Model {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  saleDate: string;

  @property({
    type: 'number',
  })
  remissionNumId?: number;

  @property({
    type: 'number',
  })
  clientId?: number;

  @property({
    type: 'number',
  })
  billId?: number;

  @property({
    type: 'number',
  })
  remissionId?: number;

  @property({
    type: 'object',
  })
  remissionNum?: Remission;

  @property({
    type: 'object',
  })
  client?: Client;

  @property({
    type: 'object',
  })
  bill?: Bill;

  @property({
    type: 'object',
  })
  remission?: Remission;

  constructor(data?: Partial<SaleDefault>) {
    super(data);
  }
}

export interface SaleDefaultRelations {
  // describe navigational properties here
}

export type SaleDefaultWithRelations = SaleDefault & SaleDefaultRelations;
