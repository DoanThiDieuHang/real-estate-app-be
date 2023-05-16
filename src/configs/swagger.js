import swaggerAutogen from 'swagger-autogen';
import { PORT } from './constants.js';
const doc = {
    info: {
        title: 'API for Real Estate APP',
        version: '1.0.0',
        description: 'API for Real Estate APP'
    },
    host: `localhost:${PORT}`,
    basePath: '/api/v1',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Estate Api',
            description: 'Endpoints'
        }
    ],
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    }
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['../routers/index.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);
