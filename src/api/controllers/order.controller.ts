import * as express from "express";
import { DeleteOrderCommand } from "../../domain/commands/order.command";
import { OrderHandler } from "../../domain/handlers/order.handler";
import { StatusCodes } from "http-status-codes";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationDelete,
  SwaggerDefinitionConstant,
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
  name: "Order",
  path: "/orders",
})
@controller("/orders")
export class OrderController implements interfaces.Controller {
  public static TARGET_NAME: string = "OrderController";

  constructor(@inject("OrderHandler") private handler: OrderHandler) {}

  @ApiOperationGet({
    description: "get all orders available and their basic information",
    summary: "get all orders",
    responses: {
      200: {
        description: "Success",
        model: "OrderViewModel",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
      },
      400: { description: "Something wrong happened" },
    },
  })
  @httpGet("/")
  private async getAllOrders(@response() res: express.Response) {
    const result = await this.handler.getAllOrders();

    if (result.valid) {
      return res.status(StatusCodes.OK).send(result.message);
    }

    return res.status(StatusCodes.BAD_REQUEST).send(result.message);
  }

  @ApiOperationPost({
    description: "add product to an order if order and product exists",
    summary: "add product to an order",
    parameters: {},
    responses: {
      201: {
        description: "Success",
        model: "OrderViewModel",
      },
      400: { description: "Something wrong happened" },
    },
  })
  @httpPost("/")
  private async createOrder(@response() res: express.Response) {
    const result = await this.handler.createOrder();

    if (!result.valid) {
      return res.status(StatusCodes.BAD_REQUEST).send(result.message);
    }

    return res.status(StatusCodes.CREATED).send(result.message);
  }

  @ApiOperationDelete({
    description: "remove an order and their order products",
    summary: "remove order",
    path: "/{id}",
    parameters: {
      path: {
        id: {
          description: "order id",
          required: true,
        },
      },
    },
    responses: {
      204: { description: "Success" },
      400: { description: "Something wrong happened" },
    },
  })
  @httpDelete("/:id")
  private async removeOrder(
    @requestParam("id") id: string,
    @response() res: express.Response
  ) {
    const command = new DeleteOrderCommand();
    command.id = parseInt(id, 10);
    const result = await this.handler.deleteOrder(command);

    if (result.valid) {
      return res.status(StatusCodes.NO_CONTENT).send();
    }

    return res.status(StatusCodes.BAD_REQUEST).send(result.message);
  }
}
