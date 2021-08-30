import _ from "lodash";
import { ICommandResult } from "../../shared/commands/interfaces/command-result.interface";
import {
  CreateProductCommand,
  DeleteProductCommand,
  UpdateProductCommand,
} from "../commands/product.command";
import { ProductQuery } from "../queries/product.query";
import { EventTracing } from "../../shared/logs/event";
import { Product } from "../entities/product.entity";
import { SupplierQuery } from "../queries/supplier.query";
import { injectable, inject } from "inversify";

@injectable()
export class ProductHandler {
  constructor(
    @inject("ProductQuery") private productQuery: ProductQuery,
    @inject("SupplierQuery") private supplierQuery: SupplierQuery
  ) {}

  async getAllProducts(): Promise<ICommandResult> {
    let products: Product[] | undefined;

    try {
      products = await this.productQuery.getAll();
    } catch (err) {
      return { valid: false, message: err };
    }

    return { valid: true, message: products };
  }

  async createProduct(command: CreateProductCommand): Promise<ICommandResult> {
    const errors = command.validate();

    const hasErrors = !_.isEmpty(errors);

    if (hasErrors) {
      return { valid: false, message: errors };
    }

    try {
      const supplier = await this.supplierQuery.findById(command.supplier_id);

      if (!supplier) {
        return {
          valid: false,
          message: { error: "must have a valid supplier id" },
        };
      }
    } catch (error) {
      return { valid: false, message: error };
    }

    const product = new Product();
    product.description = command.description;
    product.supplierId = command.supplier_id;
    product.price = command.price;

    try {
      await this.productQuery.save(product);
    } catch (error) {
      EventTracing.captureException(error);
      return { valid: false, message: errors };
    }

    return { valid: true, message: product };
  }

  async updateProduct(command: UpdateProductCommand): Promise<ICommandResult> {
    const errors = command.validate();
    const hasErrors = !_.isEmpty(errors);
    let message;

    if (hasErrors) {
      return { valid: false, message: errors };
    }

    try {
      const product = await this.productQuery.findById(command.id);

      if (!product) {
        return { valid: false, message: { error: "Product not found" } };
      }

      const hasDataToUpdate =
        command.description || command.supplier_id || command.price;

      if (!hasDataToUpdate) {
        return {
          valid: false,
          message: { error: "there's no info to update" },
        };
      }

      if (command.supplier_id) {
        try {
          const supplier = await this.supplierQuery.findById(
            command.supplier_id
          );

          if (!supplier) {
            return {
              valid: false,
              message: { error: "must have a valid supplier id" },
            };
          }
        } catch (error) {
          return { valid: false, message: error };
        }
      }

      const updatedProduct = Object.assign(product, {});

      if (command.supplier_id) {
        updatedProduct.supplierId = command.supplier_id;
      }

      if (command.description) {
        updatedProduct.description = command.description;
      }

      if (command.price) {
        updatedProduct.price = command.price;
      }

      await this.productQuery.updateProduct(product, updatedProduct);
    } catch (error) {
      EventTracing.captureException(error);
      return { valid: false, message: errors };
    }

    return { valid: true, message: this.updateProduct };
  }

  async deleteProduct(command: DeleteProductCommand): Promise<ICommandResult> {
    const errors = command.validate();

    const hasErrors = !_.isEmpty(errors);

    if (hasErrors) {
      return { valid: false, message: errors };
    }

    try {
      const product = await this.productQuery.findById(command.id);

      if (!product) {
        return { valid: false, message: { error: "product not found" } };
      }

      const ordersProduct = await product.orderProduct;
      const hasOrderRelationships = !_.isEmpty(ordersProduct);

      if (hasOrderRelationships) {
        return {
          valid: false,
          message: {
            error:
              "there's some orders related to this product. please, update them.",
            ordersProduct,
          },
        };
      }

      await this.productQuery.remove(product);
    } catch (error) {
      EventTracing.captureException(error);
      return { valid: false, message: errors };
    }

    return { valid: true };
  }
}
