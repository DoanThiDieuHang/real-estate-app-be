import express from 'express';
import morgan from 'morgan';
import AppError from './utils/AppError.js';
import globalErrorHandler from './controllers/errorController.js';
const app = express();

// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ROUTERS HANDLERS

app.use(globalErrorHandler);

export default app;
