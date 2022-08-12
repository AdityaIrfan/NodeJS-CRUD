import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import Routes from './routes/index';

const router = express();

// Connect to Mongo
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info("Connected to MongoDB")
        startServer();
    })
    .catch(error => {
        Logging.error("Unable to connect MongoDB")
        Logging.error(error)
    })

// Only start the server if the mongo connects
const startServer = () => {
    router.use((req, res, next) => {
        // Log the request
        Logging.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        
        res.on('finish', () => {
            // Log the response
            Logging.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status : [${res.statusCode}]`);
        });

        next();
    })

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Routes */
    Routes(router);

    /** Health Check */
    router.get('/ping', (req, res) => {
        res.status(200).json({
            message: "pong"
        })
    });

    /** Error Handling */
    router.use((req, res) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({
            message: error.message
        })
    })

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`))
}