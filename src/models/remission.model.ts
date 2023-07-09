import {Entity, model, property, hasOne} from '@loopback/repository';
import {Sale} from './sale.model';

@model()
export class Remission extends Entity {
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
  remission: number;

  @hasOne(() => Sale)
  sale: Sale;

  constructor(data?: Partial<Remission>) {
    super(data);
  }
}

export interface RemissionRelations {
  // describe navigational properties here
}

export type RemissionWithRelations = Remission & RemissionRelations;
