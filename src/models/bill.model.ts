import {Entity, model, property, hasOne} from '@loopback/repository';
import {Sale} from './sale.model';

@model()
export class Bill extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  bill: number;

  @hasOne(() => Sale)
  sale: Sale;

  constructor(data?: Partial<Bill>) {
    super(data);
  }
}

export interface BillRelations {
  // describe navigational properties here
}

export type BillWithRelations = Bill & BillRelations;
