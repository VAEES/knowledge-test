import * as express from "express";
import {
  CreateSupplierCommand,
  DeleteSupplierCommand,
  UpdateSupplierCommand,
} from "../../domain/commands/supplier.command";
import { SupplierHandler } from "../../domain/handlers/supplier.handler";
import { StatusCodes } from "http-status-codes";
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpDelete,
  httpPatch,
  response,
  request,
  requestParam,
} from "inversify-express-utils";
import { inject } from "inversify";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPatch,
  ApiOperationDelete,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

@ApiPath({
  name: "Supplier",
  path: "/suppliers",
})
@controller("/suppliers")
export class SupplierController implements interfaces.Controller {
  public static TARGET_NAME: string = "SupplierController";

  constructor(@inject("SupplierHandler") private handler: SupplierHandler) {}

  @ApiOperationGet({
    description: "get all suppliers available and their basic information",
    summary: "get all suppliers",
    responses: {
      200: {
        description: "Success",
        model: "SupplierViewModel",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
      },
      400: { description: "Something wrong happened" },
    },
  })
  @httpGet("/")
  private async getAllSuppliers(@response() res: express.Response) {
    const result = await this.handler.getAllSuppliers();

    if (result.valid) {
      return res.status(StatusCodes.OK).send(result.message);
    }

    return res.status(StatusCodes.BAD_REQUEST).send(result.message);
  }

  @ApiOperationPost({
    description: "add supplier",
    summary: "add supplier",
    parameters: {
      body: {
        description: "a supplier must have name and country",
        required: true,
        model: "CreateSupplierCommand",
      },
    },
    responses: {
      201: {
        description: "Success",
        model: "SupplierViewModel",
      },
      400: { description: "Something wrong happened" },
    },
  })
  @httpPost("/")
  private async createSupplier(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const command = new CreateSupplierCommand();
    command.name = req.body && req.body.name;
    command.country = req.body && req.body.country;
    const result = await this.handler.createSupplier(command);

    if (!result.valid) {
      return res.status(StatusCodes.BAD_REQUEST).send(result.message);
    }

    return res.status(StatusCodes.CREATED).send(result.message);
  }

  @ApiOperationPatch({
    description:
      "update supplier description or supplier country if supplier exists",
    summary: "update supplier",
    parameters: {
      path: {
        id: {
          description: "supplier id",
          required: true,
        },
      },
      body: {
        description: "you must give a name or a country to update",
        required: true,
        model: "UpdateSupplierCommand",
      },
    },
    responses: {
      200: {
        description: "Success",
        model: "SupplierViewModel",
      },
      400: { description: "Something wrong happened" },
    },
  })
  @httpPatch("/:id")
  private async updateSupplier(
    @requestParam("id") id: string,
    @request() request: express.Request,
    @response() response: express.Response
  ) {
    const command = new UpdateSupplierCommand();
    command.name = request.body && request.body.name;
    command.country = request.body && request.body.country;
    command.id = parseInt(id, 10);
    const result = await this.handler.updateSupplier(command);

    if (result.valid) {
      return response.status(StatusCodes.OK).send(result.message);
    }

    return response.status(StatusCodes.BAD_REQUEST).send(result.message);
  }

  @ApiOperationDelete({
    description: "remove a supplier if there's no related product",
    summary: "remove supplier",
    path: "/{id}",
    parameters: {
      path: {
        id: {
          description: "supplier id",
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
  private async removeSupplier(
    @requestParam("id") id: string,
    @response() response: express.Response
  ) {
    const command = new DeleteSupplierCommand();
    command.id = parseInt(id, 10);
    const result = await this.handler.deleteSupplier(command);

    if (result.valid) {
      return response.status(StatusCodes.NO_CONTENT).send();
    }

    return response.status(StatusCodes.BAD_REQUEST).send(result.message);
  }
}
