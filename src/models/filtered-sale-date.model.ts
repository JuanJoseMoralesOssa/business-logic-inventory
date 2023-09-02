import {Model, model, property} from '@loopback/repository';

@model()
export class FilteredSaleDate extends Model {
  @property({
    type: 'string',
    required: true,
  })
  startDate: string;

  @property({
    type: 'string',
    required: true,
  })
  endDate: string;


  constructor(data?: Partial<FilteredSaleDate>) {
    super(data);
  }
}

export interface FilteredSaleDateRelations {
  // describe navigational properties here
}

export type FilteredSaleDateWithRelations = FilteredSaleDate & FilteredSaleDateRelations;
