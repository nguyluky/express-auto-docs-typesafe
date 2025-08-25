
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import env from './env';
import { errorHandler } from './middleware/error';
import { requestLogger } from './middleware/requestLogger';
import { apiRouter, swaggerRouter } from './module';
import { Logger } from './utils/logger';
// import InitSocketIO from 'socket';

const logger = new Logger('MAIN');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {})
// InitSocketIO(io);

// app.use(exo)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger)


app.use('/docs', swaggerRouter)

app.use(apiRouter);
app.get("/", (req, res) => {
    res.send("hello") 
})

app.use((req, res, next) => {
    res.status(404).json({
        code: 404,
        message: 'Not Found',
        name: 'NotFoundError'
    })
});
app.use(errorHandler);

const port = env.PORT;

httpServer.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`)
});


