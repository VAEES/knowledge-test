# Architecture

This API was build using CQRS (command-query resposibility segregration) pattern, but without using a database for read and write data from the very beggining (just for logical undestanding). The project is divided by five modules, which each one has very specific responsibilities:

## API

Where you find controllers, DI (dependency injection) and configuration for application boostrap. ```app.ts``` is where you will find the application entrypoint and ```startup.ts``` you will find main configuration and IOC (inversion of control).

* Controllers: receive request data and fullfil (or not) some command to be send to a handler. Is responsible to send the final status to the requester, depending on the handler response.

## Domain

* Commands: holds models to be used throught API requests wheenever you need to establish some validations before calling infra resources (ex.: validates if some name has needed length to be stored in some table)
* Services: holds services for third-party API communication
* Entities: define models to be used througth the application and database schema
* Handlers: is just services who calls command and queries to achieve a final result to be send to controllers.
* Queries: uses repositories and make queries to persistance or to bring data to a requester.
* Validators: validate if some data filled on a entity and defines if is valid or not depending on the request type.

## Infra

* Repositories: holds each entity database connection logic
* Services: holds services for third-party API communication

## Shared

Hold all interfaces or services to be used between other modules.

## Tests

Hold unit and integration tests (API)
