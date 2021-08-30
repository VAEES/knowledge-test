import { Order } from "../entities/order.entity";
import { OrderRepository } from "../../infra/repositories/order.repository";
import { injectable, inject } from "inversify";

@injectable()
export class OrderQuery {
  constructor(
    @inject("OrderRepository") private orderRepository: OrderRepository
  ) {}

  async getAll(): Promise<Order[] | undefined> {
    const repository = await this.orderRepository.get();
    return repository.find();
  }

  async findById(id: number): Promise<Order | undefined> {
    const repository = await this.orderRepository.get();
    return repository.findOne(id);
  }

  async findByIdWithProducts(id: number): Promise<Order | undefined> {
    const repository = await this.orderRepository.get();
    return repository.findOne({ relations: ["products"], where: { id } });
  }

  async remove(order: Order) {
    const repository = await this.orderRepository.get();
    return repository.remove(order);
  }

  async save(order: Order) {
    const repository = await this.orderRepository.get();
    return repository.save(order);
  }
}
