import "reflect-metadata";
import { Startup } from "./startup";
import { EventTracing } from "../shared/logs/event";
import { Connection, createConnection } from "typeorm";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const url = process.env.SENTRY_KEY || "";

EventTracing.start(url);

export let connection: Connection;

const config: SqliteConnectionOptions = {
  type: "sqlite",
  database: "test.sq3",
  synchronize: true,
  logging: true,
  entities: ["src/domain/entities/*.ts"],
  cli: {
    entitiesDir: "src/domain/entities/",
  },
};

createConnection()
  .then((conn) => {
    connection = conn;
    const port = 8080;
    const app = new Startup(port);
    app.listen();
  })
  .catch((err) => {
    console.log(err);
    EventTracing.captureException(err);
  });
