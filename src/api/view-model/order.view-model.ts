import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Order Model for View Use",
  name: "OrderViewModel",
})
export class OrderViewModel {
  @ApiModelProperty({
    description: "Order Id",
    example: 1,
    required: true,
  })
  id: number;

  @ApiModelProperty({
    description: "Order Creation Date",
    example: new Date().toISOString(),
    required: true,
  })
  createdAt: Date;
}
