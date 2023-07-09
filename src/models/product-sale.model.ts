import {Entity, model, property} from '@loopback/repository';

@model()
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
