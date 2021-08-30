import { SupplierRepository } from "../../infra/repositories/supplier.repository";
import { Supplier } from "../entities/supplier.entity";
import { injectable, inject } from "inversify";

@injectable()
export class SupplierQuery {
  constructor(
    @inject("SupplierRepository") private supplierRepository: SupplierRepository
  ) {}

  async findRelations(name: string) {
    const repository = await this.supplierRepository.get();
    return repository.find({ relations: [name] });
  }

  async getAll(): Promise<Supplier[] | undefined> {
    const repository = await this.supplierRepository.get();
    return repository.find();
  }

  async findById(id: number): Promise<Supplier | undefined> {
    const repository = await this.supplierRepository.get();
    return repository.findOne(id);
  }

  async remove(Supplier: Supplier) {
    const repository = await this.supplierRepository.get();
    return repository.remove(Supplier);
  }

  async updateSupplier(supplier: Supplier, name: string, country: string) {
    const repository = await this.supplierRepository.get();
    const updatedSupplier = new Supplier();

    if (name) {
      updatedSupplier.name = name;
    }
    if (country) {
      updatedSupplier.country = country;
    }

    return repository.update(supplier, updatedSupplier);
  }

  async save(Supplier: Supplier) {
    const repository = await this.supplierRepository.get();
    return repository.save(Supplier);
  }
}
