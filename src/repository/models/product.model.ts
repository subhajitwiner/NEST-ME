import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Product extends Model {
  @Column
  name: string;

  @Column
  category: string;

  @Column({
    type: DataType.DECIMAL,
  })
  price: number;
}
