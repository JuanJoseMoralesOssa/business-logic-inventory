import {Entity, model, property} from '@loopback/repository';

@model()
export class Packing extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  packing: string;


  constructor(data?: Partial<Packing>) {
    super(data);
  }
}

export interface PackingRelations {
  // describe navigational properties here
}

export type PackingWithRelations = Packing & PackingRelations;
