import * as env from "app/../../environment.json";

export const environment = {
  ...(env['default'] || env),
  isPWAEnabled: true
};
