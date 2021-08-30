import { Repository } from "typeorm";
import { connection } from "../../api/app";
import { Product } from "../../domain/entities/product.entity";
import { injectable } from "inversify";

@injectable()
export class ProductRepository {
  async get(): Promise<Repository<Product>> {
    return connection.getRepository(Product);
  }
}
