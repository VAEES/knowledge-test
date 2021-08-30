import express, { Express } from "express";
import * as swagger from "swagger-express-ts";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { OrderProductHandler } from "../domain/handlers/order-product.handler";
import { OrderHandler } from "../domain/handlers/order.handler";
import { ProductHandler } from "../domain/handlers/product.handler";
import { SupplierHandler } from "../domain/handlers/supplier.handler";
import { OrderProductQuery } from "../domain/queries/order-product.query";
import { OrderQuery } from "../domain/queries/order.query";
import { ProductQuery } from "../domain/queries/product.query";
import { SupplierQuery } from "../domain/queries/supplier.query";
import { OrderProductRepository } from "../infra/repositories/order-product.repository";
import { OrderRepository } from "../infra/repositories/order.repository";
import { ProductRepository } from "../infra/repositories/product.repository";
import { SupplierRepository } from "../infra/repositories/supplier.repository";
import { OrderProductController } from "./controllers/order-product.controller";
import { OrderController } from "./controllers/order.controller";
import { ProductController } from "./controllers/product.controller";
import { SupplierController } from "./controllers/supplier.controller";
import bodyParser from "body-parser";

export class Startup {
  private app: express.Application;
  private server: InversifyExpressServer;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    const container = this.iocSetup();
    this.server = this.initializeMiddlewares(container);
  }

  private iocSetup(): Container {
    const container = new Container();

    // set up controllers
    container
      .bind<OrderProductController>(OrderProductController.TARGET_NAME)
      .to(OrderProductController);

    container
      .bind<OrderController>(OrderController.TARGET_NAME)
      .to(OrderController);

    container
      .bind<ProductController>(ProductController.TARGET_NAME)
      .to(ProductController);

    container
      .bind<SupplierController>(SupplierController.TARGET_NAME)
      .to(SupplierController);

    // set up repositories
    container
      .bind<OrderProductRepository>("OrderProductRepository")
      .to(OrderProductRepository);

    container.bind<OrderRepository>("OrderRepository").to(OrderRepository);

    container
      .bind<ProductRepository>("ProductRepository")
      .to(ProductRepository);

    container
      .bind<SupplierRepository>("SupplierRepository")
      .to(SupplierRepository);

    // set up queries
    container
      .bind<OrderProductQuery>("OrderProductQuery")
      .to(OrderProductQuery);
    container.bind<OrderQuery>("OrderQuery").to(OrderQuery);
    container.bind<ProductQuery>("ProductQuery").to(ProductQuery);
    container.bind<SupplierQuery>("SupplierQuery").to(SupplierQuery);

    // set up handlers
    container
      .bind<OrderProductHandler>("OrderProductHandler")
      .to(OrderProductHandler);
    container.bind<OrderHandler>("OrderHandler").to(OrderHandler);
    container.bind<ProductHandler>("ProductHandler").to(ProductHandler);
    container.bind<SupplierHandler>("SupplierHandler").to(SupplierHandler);

    return container;
  }

  private initializeMiddlewares(container: Container): InversifyExpressServer {
    const server = new InversifyExpressServer(container);
    server.setConfig((app: any) => {
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use("/api-docs/swagger", express.static("swagger"));
      app.use(
        "/api-docs/swagger/assets",
        express.static("node_modules/swagger-ui-dist")
      );
      app.use(
        swagger.express({
          definition: {
            info: {
              title: "Order API Challenge",
              version: "1.0",
            },
          },
        })
      );
    });

    server.setErrorConfig((app) => {
      app.use(
        (
          err: Error,
          request: express.Request,
          response: express.Response,
          next: express.NextFunction
        ) => {
          console.error(err.stack);
          response.status(500).send("Something broke!");
        }
      );
    });

    return server;
  }

  public listen() {
    this.app = this.server.build();
    const message = `App listening on the port ${this.port}`;
    this.app.listen(this.port, () => console.log(message));
  }
}
