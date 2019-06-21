import { url } from './config'
import { App } from "./app";

const app = new App(url);

const interval = 1000;

let count = 1;

const id = setInterval(() => {
    console.log('scrap', count++);

    app.parse().then().catch();
}, interval);
