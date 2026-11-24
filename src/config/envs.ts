import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  APP_PORT: number;
  PRODUCT_SERVICE_HOST: string;
  PRODUCT_SERVICE_PORT: number;
  ORDER_SERVICE_HOST: string;
  ORDER_SERVICE_PORT: number;
  PAGINATION_DEFAULT_PAGE: number;
  PAGINATION_DEFAULT_LIMIT: number;
}

const envsSchema = joi
  .object({
    APP_PORT: joi.number().required(),
    PRODUCT_SERVICE_HOST: joi.string().required(),
    PRODUCT_SERVICE_PORT: joi.number().required(),
    ORDER_SERVICE_HOST: joi.string().required(),
    ORDER_SERVICE_PORT: joi.number().required(),
    PAGINATION_DEFAULT_PAGE: joi.number().default(1),
    PAGINATION_DEFAULT_LIMIT: joi.number().default(10),
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
  ORDER_SERVICE_HOST: envVars.ORDER_SERVICE_HOST,
  ORDER_SERVICE_PORT: envVars.ORDER_SERVICE_PORT,
  PAGINATION_DEFAULT_PAGE: envVars.PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_LIMIT: envVars.PAGINATION_DEFAULT_LIMIT,
};
