import { Repository } from "typeorm";
import { connection } from "../../api/app";
import { Order } from "../../domain/entities/order.entity";
import { injectable } from "inversify";

@injectable()
export class OrderRepository {
  async get(): Promise<Repository<Order>> {
    return connection.getRepository(Order);
  }
}
