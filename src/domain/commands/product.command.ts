import { ICommand } from "../../shared/commands/interfaces/command.interface";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import {
  CreateProductValidator,
  UpdateProductValidator,
  DeleteProductValidator,
} from "../validators/product.validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Create Product Description",
  name: "CreateProductCommand",
})
export class CreateProductCommand implements ICommand {
  @ApiModelProperty({
    description: "product description",
    example: "here's a beautiful product description",
    required: true,
  })
  description: string;

  @ApiModelProperty({
    description: "product price",
    example: 0.9,
    required: true,
    type: "real",
  })
  price: number;

  @ApiModelProperty({
    description: "order supplier id",
    example: 1,
    required: true,
  })
  supplier_id: number;

  validate(): ValidationErrors<CreateProductCommand> {
    const validator = new CreateProductValidator();
    return validator.validate(this);
  }
}

@ApiModel({
  description: "Update Product Description or Price",
  name: "UpdateProductCommand",
})
export class UpdateProductCommand implements ICommand {
  @ApiModelProperty({
    description: "product id",
    example: 1,
    required: true,
  })
  id: number;

  @ApiModelProperty({
    description: "product supplier id",
    example: 1,
    required: false,
  })
  supplier_id: number;

  @ApiModelProperty({
    description: "product price",
    example: 0.9,
    required: false,
    type: "real",
  })
  price: number;

  @ApiModelProperty({
    description: "product description",
    example: "here's a beautiful product description",
    required: false,
  })
  description: string;

  validate(): ValidationErrors<UpdateProductCommand> {
    const validator = new UpdateProductValidator();
    return validator.validate(this);
  }
}

@ApiModel({
  description: "Delete Product Description",
  name: "DeleteProductCommand",
})
export class DeleteProductCommand implements ICommand {
  @ApiModelProperty({
    description: "product id",
    example: 1,
    required: true,
  })
  id: number;

  validate(): ValidationErrors<DeleteProductCommand> {
    const validator = new DeleteProductValidator();
    return validator.validate(this);
  }
}
