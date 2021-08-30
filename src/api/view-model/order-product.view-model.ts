import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { OrderViewModel } from "./order.view-model";
import { ProductViewModel } from "./product.view-model";
import { SupplierViewModel } from "./supplier.view-model";

@ApiModel({
  description: "Order Product Model for View Use",
  name: "OrderProductViewModel",
})
export class OrderProductViewModel {
  @ApiModelProperty({
    description: "Order Data",
    example: {
      id: 1,
      createdAt: new Date().toISOString(),
    },
    model: "",
    required: true,
  })
  order: OrderViewModel;

  @ApiModelProperty({
    description: "Order Products Data",
    example: [
      {
        id: 1,
        orderProductId: 1,
        description: "some product description goes here",
        price: 177.5,
        supplier: {
          id: 1,
          name: "Havan",
          country: "Brazil",
        },
      },
    ],
    required: true,
  })
  products: ProductViewModel[];
}
