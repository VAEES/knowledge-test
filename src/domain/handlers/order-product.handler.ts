import _ from "lodash";
import { ICommandResult } from "../../shared/commands/interfaces/command-result.interface";
import { OrderQuery } from "../queries/order.query";
import { Order } from "../entities/order.entity";
import { EventTracing } from "../../shared/logs/event";
import {
  AddOrderProductCommand,
  GetOrderProductsCommand,
  RemoveOrderProductCommand,
} from "../commands/order-product.command";
import { ProductQuery } from "../queries/product.query";
import { OrderProductQuery } from "../queries/order-product.query";
import { OrderProduct } from "../entities/order-product.entity";
import { injectable, inject } from "inversify";
import { OrderProductViewModel } from "../../api/view-model/order-product.view-model";
import { Supplier } from "../entities/supplier.entity";
import { OrderViewModel } from "../../api/view-model/order.view-model";
import { SupplierViewModel } from "../../api/view-model/supplier.view-model";
import { Product } from "../entities/product.entity";
import { ProductViewModel } from "../../api/view-model/product.view-model";

@injectable()
export class OrderProductHandler {
  constructor(
    @inject("OrderQuery") private orderQuery: OrderQuery,
    @inject("OrderProductQuery") private orderProductQuery: OrderProductQuery,
    @inject("ProductQuery") private productQuery: ProductQuery
  ) {}

  async removeOrderProduct(command: RemoveOrderProductCommand) {
    const errors = command.validate();

    const hasErrors = !_.isEmpty(errors);

    if (hasErrors) {
      return {
        valid: false,
        message: errors,
      };
    }

    let order: Order | undefined;

    try {
      order = await this.orderQuery.findById(command.id);
      if (!order) {
        return { valid: false, message: errors };
      }
    } catch (error) {
      EventTracing.captureException(error);
      return { valid: false, message: errors };
    }

    let orderProduct: OrderProduct | undefined;

    try {
      orderProduct = await this.orderProductQuery.getOrderProductById(
        command.orderProductId
      );

      if (!orderProduct) {
        return {
          valid: false,
          message: { error: "please provide a valid order product id" },
        };
      }
    } catch (error) {
      EventTracing.captureException(error);
      return {
        valid: false,
        message: errors,
      };
    }

    try {
      this.orderProductQuery.remove(orderProduct);
    } catch (error) {
      EventTracing.captureException(error);
      return { valid: false, message: errors };
    }

    return { valid: true, message: orderProduct };
  }

  async getOrderProducts(command: GetOrderProductsCommand) {
    const errors = command.validate();

    const hasErrors = !_.isEmpty(errors);

    if (hasErrors) {
      return {
        valid: false,
        message: errors,
      };
    }

    let order: Order | undefined;

    try {
      order = await this.orderQuery.findById(command.id);
      if (!order) {
        return { valid: false, message: errors };
      }
    } catch (error) {
      EventTracing.captureException(error);
      return { valid: false, message: errors };
    }

    let orderProducts: OrderProduct[] | undefined;

    try {
      orderProducts = await this.orderProductQuery.getOrderWithProducts(
        command.id
      );
    } catch (error) {
      EventTracing.captureException(error);
      return {
        valid: false,
        message: errors,
      };
    }

    const productViewModelPromises = orderProducts.map(async (orderProduct) => {
      const productViewModel = new ProductViewModel();
      productViewModel.description = orderProduct.product.description;
      productViewModel.id = orderProduct.product.id;
      productViewModel.orderProductId = orderProduct.id;
      productViewModel.price = orderProduct.product.price;
      productViewModel.supplier = await orderProduct.product.supplier;
      return productViewModel;
    });

    const orderProductViewModel = new OrderProductViewModel();
    orderProductViewModel.order = new OrderViewModel();

    try {
      const productViewModels = await Promise.all(productViewModelPromises);
      orderProductViewModel.order.id = order.id;
      orderProductViewModel.order.createdAt = order.createdAt;
      orderProductViewModel.products = productViewModels;
    } catch (error) {
      EventTracing.captureException(error);
      return {
        valid: false,
        message: errors,
      };
    }

    return { valid: true, message: orderProductViewModel };
  }

  async addOrderProduct(
    command: AddOrderProductCommand
  ): Promise<ICommandResult> {
    let order: Order | undefined;
    let orderProduct: OrderProduct;

    const errors = command.validate();

    const hasErrors = !_.isEmpty(errors);

    if (hasErrors) {
      return {
        valid: false,
        message: errors,
      };
    }

    try {
      order = (await this.orderQuery.findById(command.id)) || new Order();
      const hasOrder = !_.isEmpty(order);

      if (!hasOrder) {
        return {
          valid: false,
          message: { error: "please provide an existent order" },
        };
      }
    } catch (error) {
      EventTracing.captureException(error);
      return {
        valid: false,
        message: errors,
      };
    }

    let product: Product = new Product();

    try {
      product =
        (await this.productQuery.findById(command.product_id)) || product;
      const hasProduct = !_.isEmpty(product);

      if (!hasProduct) {
        return {
          valid: false,
          message: { error: "please provide an existent product" },
        };
      }
    } catch (error) {
      EventTracing.captureException(error);
      return {
        valid: false,
        message: errors,
      };
    }

    try {
      orderProduct = new OrderProduct();
      orderProduct.productId = command.product_id;
      orderProduct.orderId = command.id;
      await this.orderProductQuery.save(orderProduct);
    } catch (error) {
      EventTracing.captureException(error);
      return {
        valid: false,
        message: { message: "An error ocurred saving order product" },
      };
    }

    let orderProducts: OrderProduct[] | undefined;

    try {
      orderProducts = await this.orderProductQuery.getOrderWithProducts(
        command.id
      );
    } catch (error) {
      EventTracing.captureException(error);
      return {
        valid: false,
        message: errors,
      };
    }

    const productViewModelPromises = orderProducts.map(async (orderProduct) => {
      const productViewModel = new ProductViewModel();
      productViewModel.description = orderProduct.product.description;
      productViewModel.id = orderProduct.product.id;
      productViewModel.orderProductId = orderProduct.id;
      productViewModel.price = orderProduct.product.price;
      productViewModel.supplier = await orderProduct.product.supplier;
      return productViewModel;
    });

    const orderProductViewModel = new OrderProductViewModel();
    orderProductViewModel.order = new OrderViewModel();

    try {
      const productViewModels = await Promise.all(productViewModelPromises);
      orderProductViewModel.order.id = order.id;
      orderProductViewModel.order.createdAt = order.createdAt;
      orderProductViewModel.products = productViewModels;
    } catch (error) {
      EventTracing.captureException(error);
      return {
        valid: false,
        message: errors,
      };
    }

    return { valid: true, message: orderProductViewModel };
  }
}
