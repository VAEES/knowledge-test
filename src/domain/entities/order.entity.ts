import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { OrderProduct } from "./order-product.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  public orderProduct!: OrderProduct[];

  @BeforeInsert()
  updateCreatedAt() {
    this.createdAt = new Date();
  }
}
