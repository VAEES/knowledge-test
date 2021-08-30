import {
  CreateSupplierCommand,
  DeleteSupplierCommand,
  UpdateSupplierCommand,
} from "../commands/supplier.command";
import { Validator } from "fluentvalidation-ts";

export class CreateSupplierValidator extends Validator<CreateSupplierCommand> {
  constructor() {
    super();

    this.ruleFor("name")
      .notNull()
      .withMessage("please put a name")
      .maxLength(50)
      .withMessage("name must have 50 characters at maximum");

    this.ruleFor("country")
      .notNull()
      .withMessage("please put a country")
      .maxLength(50)
      .withMessage("name must have 50 characters at maximum");
  }
}

export class UpdateSupplierValidator extends Validator<UpdateSupplierCommand> {
  constructor() {
    super();

    this.ruleFor("id").notNull().withMessage("please put an supplier id");

    this.ruleFor("name")
      .maxLength(50)
      .withMessage("name must have 50 characters at maximum");

    this.ruleFor("country")
      .maxLength(50)
      .withMessage("name must have 50 characters at maximum");
  }
}

export class DeleteSupplierValidator extends Validator<DeleteSupplierCommand> {
  constructor() {
    super();

    this.ruleFor("id")
      .notNull()
      .withMessage("please put an Supplier id")
      .greaterThanOrEqualTo(0)
      .withMessage("please put a valid Supplier id");
  }
}
