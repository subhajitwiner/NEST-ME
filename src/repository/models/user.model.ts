import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password: string; // Use Buffer type for binary data in Node.js
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  passwordSalt: string; // Use Buffer type for binary data in Node.js
}
