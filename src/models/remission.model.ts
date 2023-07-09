import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Remission>) {
    super(data);
  }
}

export interface RemissionRelations {
  // describe navigational properties here
}

export type RemissionWithRelations = Remission & RemissionRelations;
