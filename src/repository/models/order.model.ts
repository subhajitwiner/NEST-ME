import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Order extends Model {
  @Column
  userId: number;

  @Column
  productId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  orderDate: Date; 
}