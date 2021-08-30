import * as express from "express";
import {
  CreateProductCommand,
  DeleteProductCommand,
  UpdateProductCommand,
} from "../../domain/commands/product.command";
import { ProductHandler } from "../../domain/handlers/product.handler";
import { StatusCodes } from "http-status-codes";
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpDelete,
  httpPatch,
  request,
  response,
  requestParam,
} from "inversify-express-utils";
import { inject } from "inversify";
import { parseInt } from "lodash";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPatch,
  ApiOperationDelete,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

@ApiPath({
  name: "Product",
  path: "/products",
})
@controller("/products")
export class ProductController implements interfaces.Controller {
  public static TARGET_NAME: string = "ProductController";

  constructor(@inject("ProductHandler") private handler: ProductHandler) {}

  @ApiOperationGet({
    description: "get all products available and their basic information",
    summary: "get all products",
    responses: {
      200: {
        description: "Success",
        model: "ProductViewModel",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
      },
      400: { description: "Something wrong happened" },
    },
  })
  @httpGet("/")
  private async getAllProducts(@response() res: express.Response) {
    const result = await this.handler.getAllProducts();

    if (result.valid) {
      return res.status(StatusCodes.OK).send(result.message);
    }

    return res.status(StatusCodes.BAD_REQUEST).send(result.message);
  }

  @ApiOperationPost({
    description: "add product to an product if product and product exists",
    summary: "add product to an product",
    parameters: {
      body: {
        description: "a product must have description and supplier id",
        required: true,
        model: "CreateProductCommand",
      },
    },
    responses: {
      201: {
        description: "Success",
        model: "ProductViewModel",
      },
      400: { description: "Something wrong happened" },
    },
  })
  @httpPost("/")
  private async createProduct(
    @request() request: express.Request,
    @response() response: express.Response
  ) {
    const command = new CreateProductCommand();
    command.supplier_id = request.body && request.body.supplierId;
    command.description = request.body && request.body.description;
    command.price = request.body && request.body.price;
    const result = await this.handler.createProduct(command);

    if (!result.valid) {
      return response.status(StatusCodes.BAD_REQUEST).send(result.message);
    }

    return response.status(StatusCodes.CREATED).send(result.message);
  }

  @ApiOperationPatch({
    description: "update product description or supplier id if product exists",
    summary: "update product",
    parameters: {
      path: {
        id: {
          description: "product id",
          required: true,
        },
      },
      body: {
        description:
          "you must give description or a new valid supplier id to update",
        required: true,
        model: "UpdateProductCommand",
      },
    },
    responses: {
      200: {
        description: "Success",
        model: "ProductViewModel",
      },
      400: { description: "Something wrong happened" },
    },
  })
  @httpPatch("/:id")
  private async updateProduct(
    @request() request: express.Request,
    @requestParam("id") id: string,
    @response() response: express.Response
  ) {
    const command = new UpdateProductCommand();
    command.supplier_id = request.body && request.body.supplierId;
    command.description = request.body && request.body.description;
    command.id = parseInt(id, 10);
    const result = await this.handler.updateProduct(command);

    if (result.valid) {
      return response.status(StatusCodes.OK).send(result.message);
    }

    return response.status(StatusCodes.BAD_REQUEST).send(result.message);
  }

  @ApiOperationDelete({
    description: "remove a product if there's no related order",
    summary: "remove product",
    path: "/{id}",
    parameters: {
      path: {
        id: {
          description: "product id",
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
  private async removeProduct(
    @requestParam("id") id: string,
    @response() response: express.Response
  ) {
    const command = new DeleteProductCommand();
    command.id = parseInt(id, 10);
    const result = await this.handler.deleteProduct(command);

    if (result.valid) {
      return response.status(StatusCodes.NO_CONTENT).send();
    }

    return response.status(StatusCodes.BAD_REQUEST).send(result.message);
  }
}
