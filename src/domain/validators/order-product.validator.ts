import {
  CreateOrderCommand,
  DeleteOrderCommand,
  UpdateOrderCommand,
} from "../commands/order.command";
import { Validator } from "fluentvalidation-ts";

export class CreateOrderValidator extends Validator<CreateOrderCommand> {
  constructor() {
    super();

    this.ruleFor("price")
      .notNull()
      .withMessage("please put a price")
      .greaterThanOrEqualTo(0)
      .withMessage("price must be higher or equals zero");
  }
}

export class UpdateOrderValidator extends Validator<UpdateOrderCommand> {
  constructor() {
    super();

    this.ruleFor("id").notNull().withMessage("please put an order id");

    this.ruleFor("price")
      .notNull()
      .withMessage("please put a price")
      .greaterThan(0)
      .withMessage("price must be higher than zero");
  }
}

export class DeleteOrderValidator extends Validator<DeleteOrderCommand> {
  constructor() {
    super();

    this.ruleFor("id")
      .notNull()
      .withMessage("please put an order id")
      .greaterThanOrEqualTo(0)
      .withMessage("please put a valid order id");
  }
}
