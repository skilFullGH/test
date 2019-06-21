import * as express from 'express';
import { App } from "../app";
import { url } from '../config'

export const routes = express.Router();

routes.get('/user/:id', async (req, res) => {
    const app = new App(url);

    const result = await app.get(req.params.id);

    if (result.success) {
        return res.json(result);
    } else {
        return res.status(400).json(result);
    }
});

routes.get('/user/:id/avatar', async (req, res) => {
    const app = new App(url);

    const result = await app.getImage(req.params.id);

    if (result.success) {
        return result.data;
    } else {
        return res.status(400).json(result);
    }
});


routes.delete('/user/:id/avatar', async (req, res) => {
    const app = new App(url);

    const result = await app.deleteImage(req.params.id);

    return res.json(result);
});

routes.get('/users', async (req, res) => {
    const app = new App(url);

    const result = await app.parse();

    if (result.success) {
        return res.json(result);
    } else {
        return res.status(400).json(result);
    }
});
