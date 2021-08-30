import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import { ICommand } from "../../shared/commands/interfaces/command.interface";
import {
  AddOrderProductValidator,
  GetOrderProductsValidator,
  RemoveOrderProductValidator,
} from "../validators/order.validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Add Order Product Description",
  name: "AddOrderProductCommand",
})
export class AddOrderProductCommand implements ICommand {
  @ApiModelProperty({
    description: "order product id",
    example: 1,
    required: true,
  })
  id: number;

  @ApiModelProperty({
    description: "product id",
    example: 1,
    required: true,
  })
  product_id: number;

  validate(): ValidationErrors<AddOrderProductCommand> {
    const validator = new AddOrderProductValidator();
    return validator.validate(this);
  }
}

@ApiModel({
  description: "Remove Order Product Description",
  name: "RemoveOrderProductCommand",
})
export class RemoveOrderProductCommand implements ICommand {
  @ApiModelProperty({
    description: "order id",
    example: 1,
    required: true,
  })
  id: number;

  @ApiModelProperty({
    description: "order product id",
    example: 1,
    required: true,
  })
  orderProductId: number;

  validate(): ValidationErrors<RemoveOrderProductCommand> {
    const validator = new RemoveOrderProductValidator();
    return validator.validate(this);
  }
}

@ApiModel({
  description: "Get Order Products Description",
  name: "GetOrderProductsCommand",
})
export class GetOrderProductsCommand implements ICommand {
  @ApiModelProperty({
    description: "order product id",
    example: 1,
    required: true,
  })
  id: number;

  validate(): ValidationErrors<GetOrderProductsCommand> {
    const validator = new GetOrderProductsValidator();
    return validator.validate(this);
  }
}
