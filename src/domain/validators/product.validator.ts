import {
  CreateProductCommand,
  DeleteProductCommand,
  UpdateProductCommand,
} from "../commands/product.command";
import { Validator } from "fluentvalidation-ts";

export class CreateProductValidator extends Validator<CreateProductCommand> {
  constructor() {
    super();

    this.ruleFor("description")
      .notNull()
      .withMessage("please put a description")
      .maxLength(100)
      .withMessage("description must not have more than 100 characters");

    this.ruleFor("supplier_id")
      .notNull()
      .withMessage("please put a supplier id")
      .greaterThanOrEqualTo(0)
      .withMessage("please put a valid supplier id");

    this.ruleFor("price")
      .notNull()
      .withMessage("please put a product price")
      .greaterThanOrEqualTo(0)
      .withMessage("please put a valid price");
  }
}

export class UpdateProductValidator extends Validator<UpdateProductCommand> {
  constructor() {
    super();

    this.ruleFor("id").notNull().withMessage("please put an Product id");

    this.ruleFor("description")
      .maxLength(100)
      .withMessage("description must not have more than 100 characters");

    this.ruleFor("supplier_id")
      .greaterThanOrEqualTo(0)
      .withMessage("please put a valid supplier id");
  }
}

export class DeleteProductValidator extends Validator<DeleteProductCommand> {
  constructor() {
    super();

    this.ruleFor("id")
      .notNull()
      .withMessage("please put an Product id")
      .greaterThanOrEqualTo(0)
      .withMessage("please put a valid Product id");
  }
}
