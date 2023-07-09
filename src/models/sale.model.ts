import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Client} from './client.model';
import {Product} from './product.model';
import {ProductSale} from './product-sale.model';
import {Bill} from './bill.model';
import {Remission} from './remission.model';

@model()
export class Sale extends Entity {
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
    required: true,
  })
  remission: number;

  @belongsTo(() => Client)
  clientId: number;

  @hasMany(() => Product, {through: {model: () => ProductSale}})
  products: Product[];

  @belongsTo(() => Bill)
  billId: number;

  @belongsTo(() => Remission)
  remissionId: number;

  constructor(data?: Partial<Sale>) {
    super(data);
  }
}

export interface SaleRelations {
  // describe navigational properties here
}

export type SaleWithRelations = Sale & SaleRelations;
