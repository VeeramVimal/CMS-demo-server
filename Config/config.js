const dotenv = require("dotenv");
const path = require('path');
const Joi = require('joi');
dotenv.config({ path: path.join(__dirname, '../.env')});
// dotenv.config({path: `./env.${process.env.NODE_ENV}`});

const envVarsSchema = Joi.object().keys({
    // NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT : Joi.number().default(8000),
    MONGODB_URL: Joi.string().required().description('Mongo database Cluster string'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(1).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
}).unknown();

const { value: envVars, error} =  envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
// mongodb+srv://VimalRaj:<password>@cluster0.1b2f5.mongodb.net/

module.exports = {
    // env: envVars.NODE_ENV,
    // PORT: process.env.PORT || 8000,
    PORT: envVars.PORT,
    MONGODB_URL : envVars.MONGODB_URL,
    // MONGODB_URL : process.env.MONGODB_URL || "mongodb+srv://vimalvr003:L28ad3IHy6ncp8SQ@cluster0.6ywljdx.mongodb.net/CMS",
   
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
      },
}

 // "mongodb://127.0.0.1:27017/SMS"
// mongodb+srv://vimalvr003:L28ad3IHy6ncp8SQ@cluster0.6ywljdx.mongodb.net/