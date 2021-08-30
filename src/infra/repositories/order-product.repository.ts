import { Repository } from "typeorm";
import { connection } from "../../api/app";
import { OrderProduct } from "../../domain/entities/order-product.entity";
import { injectable } from "inversify";

@injectable()
export class OrderProductRepository {
  async get(): Promise<Repository<OrderProduct>> {
    return connection.getRepository(OrderProduct);
  }
}
