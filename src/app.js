import express from 'express';
import morgan from 'morgan';
import AppError from './utils/AppError.js';
import globalErrorHandler from './controllers/errorController.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import { NODE_ENV } from './configs/constants.js';
import router from './routers/index.js';
// import swaggerUi from 'swagger-ui-express';
// import { createRequire } from 'node:module';
import cors from 'cors';

// const require = createRequire(import.meta.url);
// const swaggerFile = require('./configs/swagger_output.json');

const app = express();
app.use(cors());
console.log(NODE_ENV);
// GLOBAL MILLDEWARE
// Set security HTTP headers
app.use(helmet());
//Development looging
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//Limit request from the same API
const limiter = rateLimit({
    max: 1000, // limit each IP to 100 requests per windowMs
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many request from this IP , please try again in an hour'
});
app.use('/api', limiter);

// Body parser,reading data from into req.body
app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true }));
//Data sanitiation against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());
// Prevent parameter pollution
app.use(hpp());

//test Middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// ROUTER HANDLERS
app.use('/api/v1', router);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ROUTERS HANDLERS

app.use(globalErrorHandler);

export default app;
