import {Entity, model, property, hasMany} from '@loopback/repository';
import {Product} from './product.model';

@model()
export class Packing extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  packing: string;

  @hasMany(() => Product)
  products: Product[];

  constructor(data?: Partial<Packing>) {
    super(data);
  }
}

export interface PackingRelations {
  // describe navigational properties here
}

export type PackingWithRelations = Packing & PackingRelations;
