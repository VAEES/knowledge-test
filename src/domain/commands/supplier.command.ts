import { ICommand } from "../../shared/commands/interfaces/command.interface";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import {
  CreateSupplierValidator,
  UpdateSupplierValidator,
  DeleteSupplierValidator,
} from "../validators/supplier.validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Create Supplier Description",
  name: "CreateSupplierCommand",
})
export class CreateSupplierCommand implements ICommand {
  @ApiModelProperty({
    description: "supplier name",
    example: "Renner",
    required: true,
  })
  name: string;

  @ApiModelProperty({
    description: "supplier country",
    example: "Brazil",
    required: true,
  })
  country: string;

  validate(): ValidationErrors<CreateSupplierCommand> {
    const validator = new CreateSupplierValidator();
    return validator.validate(this);
  }
}

@ApiModel({
  description: "Update Supplier Description",
  name: "UpdateSupplierCommand",
})
export class UpdateSupplierCommand implements ICommand {
  @ApiModelProperty({
    description: "supplier id",
    example: 1,
    required: true,
  })
  id: number;

  @ApiModelProperty({
    description: "supplier name",
    example: "Renner",
    required: false,
  })
  name: string;

  @ApiModelProperty({
    description: "supplier country",
    example: "Brazil",
    required: false,
  })
  country: string;

  validate(): ValidationErrors<UpdateSupplierCommand> {
    const validator = new UpdateSupplierValidator();
    return validator.validate(this);
  }
}

@ApiModel({
  description: "Delete Supplier Description",
  name: "DeleteSupplierCommand",
})
export class DeleteSupplierCommand implements ICommand {
  @ApiModelProperty({
    description: "supplier id",
    example: 1,
    required: true,
  })
  id: number;

  validate(): ValidationErrors<DeleteSupplierCommand> {
    const validator = new DeleteSupplierValidator();
    return validator.validate(this);
  }
}
