const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'DDD Forum ISEP API',
    description: 'DDD Forum ISEP API',
  },
  host: 'localhost:5001',
  schemes: ['http'],
  basePath: '/api/v1',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/shared/infra/http/api/v1.ts'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);