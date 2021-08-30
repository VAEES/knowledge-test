import { Connection, Repository } from "typeorm";
import { connection } from "../../api/app";
import { Supplier } from "../../domain/entities/supplier.entity";
import { injectable } from "inversify";

@injectable()
export class SupplierRepository {
  connection: Connection;
  async get(): Promise<Repository<Supplier>> {
    return connection.getRepository(Supplier);
  }
}
