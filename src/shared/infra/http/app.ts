import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { v1Router } from './api/v1';
import { isProduction } from '../../../config';

const swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
  const swaggerFile = require('../../../swagger-output.json')

const origin = {
  // origin: isProduction ? 'https://dddforum.com' : '*',
  origin: "*"
}

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(origin))
app.use(compression())
app.use(helmet())
app.use(morgan('combined'))

app.use('/api/v1', v1Router)

/* for swagger jsdoc 
// Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DDD Forum ISEP API with Swagger",
      version: "0.1.0",
      description:
        "DDD Forum ISEP API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "ISEP",
        url: "http://isep.ipp.pt",
        email: "atb@isep.ipp.pt",
      },
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
  },
  apis: ["./src/modules/forum/infra/http/routes/*.ts", "./src/modules/users/infra/http/routes/*.ts"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
  })
);
*/

// Swagger
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`)
})