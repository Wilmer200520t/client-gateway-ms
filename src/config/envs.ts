import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  APP_PORT: number;
  PRODUCT_SERVICE_HOST: string;
  PRODUCT_SERVICE_PORT: number;
}

const envsSchema = joi
  .object({
    APP_PORT: joi.number().required(),
    PRODUCT_SERVICE_HOST: joi.string().required(),
    PRODUCT_SERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  APP_PORT: envVars.APP_PORT,
  PRODUCT_SERVICE_HOST: envVars.PRODUCT_SERVICE_HOST,
  PRODUCT_SERVICE_PORT: envVars.PRODUCT_SERVICE_PORT,
};
