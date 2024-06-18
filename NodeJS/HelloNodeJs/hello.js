const express = require('express')

const app = express()

app.listen(3875, () => {
    console.log('Server is running on http://localhost:3875')
});

app.get('/', (req, res) => {
    console.log(req.query)
    res.send({
        message: 'Hello World from ExpressJS'
    })
});

app.get('/students', (req, res) => {
    res.send([
        {firstName: 'John', lastName: 'Doe'},
        {firstName: 'Jane', lastName: 'Doe'},
        {firstName: 'Alice', lastName: 'Doe'},
        {firstName: 'Bob', lastName: 'Doe'}
    ])
});