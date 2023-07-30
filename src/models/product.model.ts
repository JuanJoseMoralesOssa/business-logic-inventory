import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Sale} from './sale.model';
import {ProductSale} from './product-sale.model';
import {Packing} from './packing.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_product_packingId: {
        name: "fk_product_packingId",
        entity: "Packing",
        entityKey: "id",
        foreignKey: "packingId",
      }
    },
  }
})
export class Product extends Entity {
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
  code?: string;

  @property({
    type: 'string',
    required: true,
  })
  productName: string;

  @property({
    type: 'number',
    required: true,
  })
  totalQuantity: number;

  @property({
    type: 'number',
    required: true,
  })
  totalWeight: number;

  @hasMany(() => Sale, {through: {model: () => ProductSale}})
  sales: Sale[];

  @belongsTo(() => Packing)
  packingId: number;

  @hasMany(() => ProductSale)
  productSales: ProductSale[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
