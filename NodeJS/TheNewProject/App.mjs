import express from 'express';
import cors from 'cors';

export const app = express();

app.use(cors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
}));

app.listen(4444, () => {
    console.log('Server is running on port 4444');
});

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World!'
    });
});

import ('./Handlers/Files.mjs')