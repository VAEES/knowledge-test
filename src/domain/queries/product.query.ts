import { Product } from "../entities/product.entity";
import { ProductRepository } from "../../infra/repositories/product.repository";
import { injectable, inject } from "inversify";

@injectable()
export class ProductQuery {
  constructor(
    @inject("ProductRepository") private productRepository: ProductRepository
  ) {}

  async getAll(): Promise<Product[] | undefined> {
    const repository = await this.productRepository.get();
    return repository.find();
  }

  async findById(id: number): Promise<Product | undefined> {
    const repository = await this.productRepository.get();
    return repository.findOne(id);
  }

  async remove(product: Product) {
    const repository = await this.productRepository.get();
    return repository.remove(product);
  }

  async updateProduct(product: Product, updatedProduct: Product) {
    const repository = await this.productRepository.get();
    return repository.update(product, updatedProduct);
  }

  async save(product: Product) {
    const repository = await this.productRepository.get();
    return repository.save(product);
  }
}
