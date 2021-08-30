import * as express from "express";
import { StatusCodes } from "http-status-codes";
import {
  AddOrderProductCommand,
  GetOrderProductsCommand,
  RemoveOrderProductCommand,
} from "../../domain/commands/order-product.command";
import { OrderProductHandler } from "../../domain/handlers/order-product.handler";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationDelete,
} from "swagger-express-ts";
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpDelete,
  response,
  requestParam,
} from "inversify-express-utils";
import { inject } from "inversify";

@ApiPath({
  name: "Order Product",
  path: "/orders/{id}/products",
})
@controller("/orders/:id/products")
export class OrderProductController implements interfaces.Controller {
  public static TARGET_NAME: string = "OrderProductController";

  constructor(
    @inject("OrderProductHandler") private handler: OrderProductHandler
  ) {}

  @ApiOperationDelete({
    description: "delete order from order if order and order product exists",
    summary: "remove product from order",
    path: "/{orderProductId}",
    parameters: {
      path: {
        id: {
          description: "order id",
          required: true,
        },
        orderProductId: {
          description: "order product id",
          required: true,
        },
      },
    },
    responses: {
      204: { description: "Success" },
      400: { description: "Something wrong happened" },
    },
  })
  @httpDelete("/:orderProductId")
  private async removeOrderProduct(
    @requestParam("id") id: string,
    @requestParam("orderProductId") orderProductId: string,
    @response() res: express.Response
  ) {
    const command = new RemoveOrderProductCommand();
    command.id = parseInt(id, 10);
    command.orderProductId = parseInt(orderProductId, 10);
    const result = await this.handler.removeOrderProduct(command);

    if (result.valid) {
      return res.status(StatusCodes.OK).send(result.message);
    }

    return res.status(StatusCodes.BAD_REQUEST).send(result.message);
  }

  @ApiOperationGet({
    description: "get order products if order exists",
    summary: "get order products",
    parameters: {
      path: {
        id: {
          description: "order id",
          required: true,
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        model: "OrderProductViewModel",
      },
      400: { description: "Something wrong happened" },
    },
  })
  @httpGet("/")
  private async getOrderProducts(
    @requestParam("id") id: string,
    @response() res: express.Response
  ) {
    const command = new GetOrderProductsCommand();
    command.id = parseInt(id, 10);
    const result = await this.handler.getOrderProducts(command);

    if (result.valid) {
      return res.status(StatusCodes.OK).send(result.message);
    }

    return res.status(StatusCodes.BAD_REQUEST).send(result.message);
  }

  @ApiOperationPost({
    description: "add product to an order if order and product exists",
    summary: "add product to an order",
    path: "/{productId}",
    parameters: {
      path: {
        id: {
          description: "order id",
          required: true,
        },
        productId: {
          description: "product id",
          required: true,
        },
      },
    },
    responses: {
      201: {
        description: "Success",
        model: "OrderProductViewModel",
      },
      400: { description: "Something wrong happened" },
    },
  })
  @httpPost("/:productId")
  private async addOrderProduct(
    @requestParam("id") id: string,
    @requestParam("productId") productId: string,
    @response() res: express.Response
  ) {
    const command = new AddOrderProductCommand();
    command.id = parseInt(id, 10);
    command.product_id = parseInt(productId, 10);
    const result = await this.handler.addOrderProduct(command);

    if (result.valid) {
      return res.status(StatusCodes.OK).send(result.message);
    }

    return res.status(StatusCodes.BAD_REQUEST).send(result.message);
  }
}
