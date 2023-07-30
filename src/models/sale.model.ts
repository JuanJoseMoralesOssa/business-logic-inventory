import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Client} from './client.model';
import {Product} from './product.model';
import {ProductSale} from './product-sale.model';
import {Bill} from './bill.model';
import {Remission} from './remission.model';

@model({
  settings: {
    foreignKeys: {
      fk_sale_remissionNumId: {
        name: "fk_sale_remissionNumId",
        entity: "Remission",
        entityKey: "id",
        foreignKey: "remissionNumId",
      },
      fk_sale_clientId: {
        name: "fk_sale_clientId",
        entity: "Client",
        entityKey: "id",
        foreignKey: "clientId",
      },
      fk_sale_billId: {
        name: "fk_sale_billId",
        entity: "Bill",
        entityKey: "id",
        foreignKey: "billId",
      },
      fk_sale_remissionId: {
        name: "fk_sale_remissionId",
        entity: "Remission",
        entityKey: "id",
        foreignKey: "remissionId",
      },
    }
  }
})
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

  @belongsTo(() => Remission)
  remissionNumId: number;

  @belongsTo(() => Client)
  clientId: number;

  @hasMany(() => Product, {through: {model: () => ProductSale}})
  products: Product[];

  @belongsTo(() => Bill)
  billId: number;

  @belongsTo(() => Remission)
  remissionId: number;

  @hasMany(() => ProductSale)
  productSales: ProductSale[];

  constructor(data?: Partial<Sale>) {
    super(data);
  }
}

export interface SaleRelations {
  // describe navigational properties here
}

export type SaleWithRelations = Sale & SaleRelations;
