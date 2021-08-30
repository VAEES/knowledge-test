import { Validator } from "fluentvalidation-ts";
import {
  AddOrderProductCommand,
  GetOrderProductsCommand,
  RemoveOrderProductCommand,
} from "../commands/order-product.command";

export class RemoveOrderProductValidator extends Validator<RemoveOrderProductCommand> {
  constructor() {
    super();

    this.ruleFor("id")
      .notNull()
      .withMessage("please provide a valid id")
      .greaterThanOrEqualTo(0)
      .withMessage("id must be valid");

    this.ruleFor("orderProductId")
      .notNull()
      .withMessage("please provide a valid order product id")
      .greaterThanOrEqualTo(0)
      .withMessage("id must be valid");
  }
}

export class GetOrderProductsValidator extends Validator<GetOrderProductsCommand> {
  constructor() {
    super();

    this.ruleFor("id")
      .notNull()
      .withMessage("please provide a valid id")
      .greaterThanOrEqualTo(0)
      .withMessage("id must be valid");
  }
}

export class AddOrderProductValidator extends Validator<AddOrderProductCommand> {
  constructor() {
    super();

    this.ruleFor("id")
      .notNull()
      .withMessage("please provide a valid order id")
      .greaterThanOrEqualTo(0)
      .withMessage("id must be valid");

    this.ruleFor("product_id")
      .notNull()
      .withMessage("please provide a valid product id")
      .greaterThanOrEqualTo(0)
      .withMessage("id must be valid");
  }
}
