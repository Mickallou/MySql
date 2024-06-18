const express = require('express')
const mysql = require('mysql2')

const con = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'full-stack-w310523er'
});

con.connect(err => {
    if (err) {
        throw err
    }
    console.log('Connected to database')
}
)

const app = express()

app.listen(3890, () => {
    console.log('Server is running on http://localhost:3890')
})

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World from index.js'
    })
});

app.get('/students', (req, res) => {
    con.query('SELECT * FROM students', (err, results) => {
        if (err) {
            throw err
        }
        res.send(results)
        console.log('Students data sent to client')
    })
});