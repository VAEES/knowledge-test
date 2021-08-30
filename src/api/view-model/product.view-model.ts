import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { SupplierViewModel } from "./supplier.view-model";

@ApiModel({
  description: "Product Model for View Use",
  name: "ProductViewModel",
})
export class ProductViewModel {
  @ApiModelProperty({
    description: "Product Id",
    example: 1,
    required: true,
  })
  id?: number;

  @ApiModelProperty({
    description: "Order Product Id",
    example: 1,
    required: true,
  })
  orderProductId?: number;

  @ApiModelProperty({
    description: "Product description",
    example: "product description",
    required: true,
  })
  description: string;

  @ApiModelProperty({
    description: "Product price",
    example: 177.5,
    required: true,
  })
  price: number;

  @ApiModelProperty({
    description: "Product price",
    example: {
      id: 1,
      name: "Havan",
      country: "Brazil",
    },
    required: true,
    model: "SupplierViewModel",
  })
  supplier: SupplierViewModel;
}
