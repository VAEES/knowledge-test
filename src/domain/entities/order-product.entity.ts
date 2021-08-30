import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public orderId: number;

  @Column()
  public productId: number;

  @ManyToOne(() => Order, (order) => order.orderProduct)
  public order!: Order;

  @ManyToOne(() => Product, (product) => product.orderProduct)
  public product!: Product;
}
