import { DeleteResult } from "typeorm";
import { OrderProductRepository } from "../../infra/repositories/order-product.repository";
import { OrderProduct } from "../entities/order-product.entity";
import { injectable, inject } from "inversify";

@injectable()
export class OrderProductQuery {
  constructor(
    @inject("OrderProductRepository")
    private orderProductRepository: OrderProductRepository
  ) {}

  async getOrderWithProducts(id: number): Promise<OrderProduct[]> {
    const repository = await this.orderProductRepository.get();
    return await repository.find({
      relations: ["product"],
      where: { order: { id } },
    });
  }

  async getOrderProductsByOrderId(orderId: number): Promise<OrderProduct[]> {
    const repository = await this.orderProductRepository.get();
    return repository
      .createQueryBuilder("order_product")
      .where("order_product.orderId = :orderId", { orderId })
      .getMany();
  }

  async getOrderProductById(id: number): Promise<OrderProduct | undefined> {
    const repository = await this.orderProductRepository.get();
    return repository.findOne(id);
  }

  async removeOrderProducts(orderId: number): Promise<DeleteResult> {
    const repository = await this.orderProductRepository.get();
    return repository
      .createQueryBuilder("order_product")
      .delete()
      .where("order_product.orderId = :orderId", { orderId })
      .execute();
  }

  async getAll(): Promise<OrderProduct[] | undefined> {
    const repository = await this.orderProductRepository.get();
    return repository.find();
  }

  async findById(id: number): Promise<OrderProduct | undefined> {
    const repository = await this.orderProductRepository.get();
    return repository.findOne(id);
  }

  async findByIdWithProducts(id: number): Promise<OrderProduct | undefined> {
    const repository = await this.orderProductRepository.get();
    return repository.findOne({ relations: ["products"], where: { id } });
  }

  async remove(orderProduct: OrderProduct) {
    const repository = await this.orderProductRepository.get();
    return repository.remove(orderProduct);
  }

  async save(orderProduct: OrderProduct) {
    const repository = await this.orderProductRepository.get();
    return repository.save(orderProduct);
  }
}
