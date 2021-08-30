import _ from "lodash";
import { ICommandResult } from "../../shared/commands/interfaces/command-result.interface";
import {
  CreateSupplierCommand,
  DeleteSupplierCommand,
  UpdateSupplierCommand,
} from "../commands/supplier.command";
import { SupplierQuery } from "../queries/supplier.query";
import { EventTracing } from "../../shared/logs/event";
import { Supplier } from "../entities/supplier.entity";
import { injectable, inject } from "inversify";

@injectable()
export class SupplierHandler {
  constructor(@inject("SupplierQuery") private supplierQuery: SupplierQuery) {}

  async getAllSuppliers(): Promise<ICommandResult> {
    let suppliers: Supplier[] | undefined;

    try {
      suppliers = await this.supplierQuery.getAll();
    } catch (err) {
      return { valid: false, message: err };
    }

    return { valid: true, message: suppliers };
  }

  async createSupplier(
    command: CreateSupplierCommand
  ): Promise<ICommandResult> {
    const errors = command.validate();

    const hasErrors = !_.isEmpty(errors);

    if (hasErrors) {
      return { valid: false, message: errors };
    }

    const supplier = new Supplier();
    supplier.name = command.name;
    supplier.country = command.country;

    try {
      await this.supplierQuery.save(supplier);
    } catch (error) {
      EventTracing.captureException(error);
      return {
        valid: false,
        message: errors,
      };
    }

    return { valid: true, message: supplier };
  }

  async updateSupplier(
    command: UpdateSupplierCommand
  ): Promise<ICommandResult> {
    const errors = command.validate();
    const hasErrors = !_.isEmpty(errors);
    let message;

    if (hasErrors) {
      return { valid: false, message: errors };
    }

    try {
      const supplier = await this.supplierQuery.findById(command.id);
      const hasDataToUpdate = command.name || command.country;

      if (!supplier) {
        return { valid: false, message: { error: "supplier not found" } };
      }

      if (!hasDataToUpdate) {
        return { valid: false, message: supplier };
      }

      await this.supplierQuery.updateSupplier(
        supplier,
        command.name,
        command.country
      );

      if (command.name) {
        supplier.name = command.name;
      }

      if (command.country) {
        supplier.country = command.country;
      }

      message = supplier;
    } catch (error) {
      EventTracing.captureException(error);
      return { valid: false, message: errors };
    }

    return { valid: true, message };
  }

  async deleteSupplier(
    command: DeleteSupplierCommand
  ): Promise<ICommandResult> {
    const errors = command.validate();

    const hasErrors = !_.isEmpty(errors);

    if (hasErrors) {
      return { valid: false, message: errors };
    }

    try {
      const supplier = await this.supplierQuery.findById(command.id);

      if (!supplier) {
        return { valid: false, message: { error: "supplier not found" } };
      }

      const products = await supplier.products;
      const hasProducts = !_.isEmpty(products);

      if (hasProducts) {
        return {
          valid: false,
          message: {
            error:
              "there's some products related to this supplier. please, update them.",
            products,
          },
        };
      }

      await this.supplierQuery.remove(supplier);
    } catch (error) {
      EventTracing.captureException(error);
      return { valid: false, message: errors };
    }

    return { valid: true };
  }
}
