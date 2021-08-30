import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { OrderProduct } from "./order-product.entity";
import { Supplier } from "./supplier.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  supplierId: number;

  @Column({ length: 100 })
  description: string;

  @Column("real")
  price: number;

  @ManyToOne(() => Supplier)
  supplier: Promise<Supplier>;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  public orderProduct: Promise<OrderProduct[]>;
}
