import express from 'express';
import cors from 'cors';
import fs from 'fs';
import moment from 'moment';

const app = express();

app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}));

app.use((req, res, next) => {
    const fileName = 'log_' + moment().format('YYYY_MM_DD') + '.txt';

    let fileContent = '';
    fileContent += `Method: ${req.method}\n`;
    fileContent += `ROUTE: ${req.url}\n`;
    fileContent += `Time: ${moment().format('DD/MM/YYYY HH:mm:ss')}\n`;

    fs.mkdirSync('./logs', { recursive: true });

    fs.appendFile('./logs/' + fileName, fileContent + '\n', (err) => {})
    next();
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

app.get('/', (req, res) => {
    res.send('Hello World');
});
