import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_productxSale_saleId: {
        name: "fk_productxSale_saleId",
        entity: "Sale",
        entityKey: "id",
        foreignKey: "saleId",
      },
      fk_productxSale_productId: {
        name: "fk_productxSale_productId",
        entity: "Product",
        entityKey: "id",
        foreignKey: "productId",
      },
    }
  }
})
export class ProductSale extends Entity {
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
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  @property({
    type: 'boolean',
    required: true,
  })
  IsBorrowed: boolean;

  @property({
    type: 'number',
  })
  productId?: number;

  @property({
    type: 'number',
  })
  saleId?: number;

  constructor(data?: Partial<ProductSale>) {
    super(data);
  }
}

export interface ProductSaleRelations {
  // describe navigational properties here
}

export type ProductSaleWithRelations = ProductSale & ProductSaleRelations;
