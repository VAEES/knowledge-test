import _ from "lodash";
import { ICommandResult } from "../../shared/commands/interfaces/command-result.interface";
import { DeleteOrderCommand } from "../commands/order.command";
import { OrderQuery } from "../queries/order.query";
import { Order } from "../entities/order.entity";
import { EventTracing } from "../../shared/logs/event";
import { injectable, inject } from "inversify";
import { OrderViewModel } from "../../api/view-model/order.view-model";

@injectable()
export class OrderHandler {
  constructor(@inject("OrderQuery") private orderQuery: OrderQuery) {}

  async getAllOrders(): Promise<ICommandResult> {
    let orders: Order[] | undefined = [];
    try {
      orders = (await this.orderQuery.getAll()) || [];
    } catch (err) {
      return {
        valid: false,
        message: err,
      };
    }

    orders?.forEach((order) => {
      const orderViewModel = new OrderViewModel();
      orderViewModel.id = order.id;
      orderViewModel.createdAt = order.createdAt;
    });

    return { valid: true, message: orders };
  }

  async createOrder(): Promise<ICommandResult> {
    const order = new Order();

    try {
      await this.orderQuery.save(order);
    } catch (error) {
      EventTracing.captureException(error);
      return {
        valid: false,
        message: { error: "some problem ocurred on order creation" },
      };
    }

    const orderViewModel = new OrderViewModel();
    orderViewModel.createdAt = order.createdAt;
    orderViewModel.id = order.id;

    return { valid: true, message: orderViewModel };
  }

  async deleteOrder(
    deleteOrderCommand: DeleteOrderCommand
  ): Promise<ICommandResult> {
    const errors = deleteOrderCommand.validate();

    const hasErrors = !_.isEmpty(errors);

    if (hasErrors) {
      return { valid: false, message: errors };
    }

    try {
      const order = await this.orderQuery.findById(deleteOrderCommand.id);

      if (!order) {
        return { valid: false, message: { error: "order not found" } };
      }

      await this.orderQuery.remove(order);
    } catch (error) {
      EventTracing.captureException(error);
      return { valid: false, message: errors };
    }

    return { valid: true };
  }
}
