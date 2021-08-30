import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";

export interface ICommand {
  validate(): ValidationErrors<ICommand>;
}
