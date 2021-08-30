import { ICommand } from "../../shared/commands/interfaces/command.interface";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import {
  CreateOrderValidator,
  UpdateOrderValidator,
  DeleteOrderValidator,
} from "../validators/order-product.validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Create Order Description",
  name: "CreateOrderCommand",
})
export class CreateOrderCommand implements ICommand {
  @ApiModelProperty({
    description: "order price",
    example: 1125.28,
    required: true,
  })
  price: number;

  validate(): ValidationErrors<CreateOrderCommand> {
    const validator = new CreateOrderValidator();
    return validator.validate(this);
  }
}

@ApiModel({
  description: "Create Order Description",
  name: "UpdateOrderCommand",
})
export class UpdateOrderCommand implements ICommand {
  @ApiModelProperty({
    description: "order id",
    example: 1,
    required: true,
  })
  id: number;

  @ApiModelProperty({
    description: "order price",
    example: 1125.28,
    required: true,
  })
  price: number;

  validate(): ValidationErrors<UpdateOrderCommand> {
    const validator = new UpdateOrderValidator();
    return validator.validate(this);
  }
}

@ApiModel({
  description: "Delete Order Description",
  name: "DeleteOrderCommand",
})
export class DeleteOrderCommand implements ICommand {
  @ApiModelProperty({
    description: "order id",
    example: 1,
    required: true,
  })
  id: number;

  validate(): ValidationErrors<DeleteOrderCommand> {
    const validator = new DeleteOrderValidator();
    return validator.validate(this);
  }
}
