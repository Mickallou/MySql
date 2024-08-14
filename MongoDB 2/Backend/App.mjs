import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chalk from 'chalk';
import { getUser } from './Guard.mjs';
import dotenv from 'dotenv';
import morgan from 'morgan';
import moment from 'moment';

dotenv.config();

async function main() {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log('mongodb connection established on port 27017');
}

main().catch(err => console.log(err));

export const app = express();

app.use(express.json());

app.use(morgan(function (tokens, req, res) {
const status = tokens.status(req, res)

    return [
        chalk.blue(tokens.method(req, res)),
        chalk.green(tokens.url(req, res)),
        status >= 200 && status < 400 ? chalk.bgGreen(tokens.status(req, res)) : chalk.bgRed(tokens.status(req, res)),
        chalk.red(moment().format('YYYY-MM-DD HH:mm')), '-',
        chalk.bgBlack(tokens['response-time'](req, res)), 'ms'
    ].join(' ')
}));

app.use(express.static('public'));

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

app.listen(process.env.PORT , () => {
    console.log('listening on port 8989');
});

app.use((req, res, next) => {
    const user = getUser(req)
    console.log(chalk.blue(req.method));
    console.log(chalk.green(req.url));
    console.log(chalk.red('User Id: ') + chalk.blue.bold(user?._id));

    next();
});

app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to the Full Stack App',
    });
});

(async () => {
    await import("./handlers/users/users.mjs");
    await import("./handlers/users/auth.mjs");
    await import("./handlers/cards/cards.mjs");
    await import("./initial-data/initial-data.service.mjs")
    
    app.get("*", (req, res) => {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(`<meta charset="UTF-8">`);
        res.write(`
            <style>
                * {
                    direction: rtl;
                    text-align: center;
                    color: red;
                }
            </style>
        `);
        res.write("<h1>שגיאה 404</h1>");
        res.write("<h2>הדף המבוקש לא נמצא</h2>");
        res.end();
    });
})()
