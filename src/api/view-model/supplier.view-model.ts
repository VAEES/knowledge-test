import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Supplier Model for View Use",
  name: "SupplierViewModel",
})
export class SupplierViewModel {
  @ApiModelProperty({
    description: "Supplier Id",
    example: 1,
    required: true,
  })
  id?: number;

  @ApiModelProperty({
    description: "Supplier Name",
    example: "Havan",
    required: true,
  })
  name: string;

  @ApiModelProperty({
    description: "Supplier Country",
    example: "Brazil",
    required: true,
  })
  country: string;
}
