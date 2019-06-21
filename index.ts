import * as express from 'express';
import { routes } from './routes';
import { port, host } from './config'

const server = express();

server.use('/api', routes);

server.use((err, req, res, next) => {
    return res.status(400).json({
        status: 400,
        error: err.toString()
    });
});

server.use('*', (req, res) => {
    return res.status(404).json({
        status: 404
    });
});

server.listen(port, host);
