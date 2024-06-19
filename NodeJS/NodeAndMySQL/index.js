const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

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

app.use(cors(
    {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credential: true,
        allowedHeaders: ['Content-Type', 'Accept']
    }
))
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

app.get('/students/average', (req, res) => {
    con.query(
        `SELECT 
            students.firstName,
            students.lastName,
            AVG(test_grades.grade) AS average FROM students 
        LEFT JOIN 
            test_grades ON test_grades.studentId = students.id 
        GROUP BY 
            students.id;`,
        (err, results) => {
            if (err) {
                throw err
            }
            res.send(results)
            console.log('Average grade sent to client')
        }
    )
});

app.get('/students/average-by-city', (req, res) => {
    con.query(
        `SELECT 
            students.city, 
            AVG(test_grades.grade) AS averageByCity 
        FROM 
            students 
        LEFT JOIN 
            test_grades ON test_grades.studentId = students.id 
        GROUP BY 
            students.city;`,
        (err, results) => {
            if (err) {
                throw err
            }
            res.send(results)
            console.log('Average from city grade sent to client')
        }
    )
});

app.get('/students/:id', (req, res) => {
    const {id} = req.params
    con.query(
        `SELECT
            students.firstName,
            students.lastName,
            tests.name AS testName,
            test_grades.grade
        FROM
            test_grades
        LEFT JOIN students ON test_grades.studentId = students.id
        LEFT JOIN tests ON test_grades.testId = tests.id
        WHERE
            students.id = ?`, [id],
        (err, results) => {
            if (err) {
                throw err
            }
            res.send(results)
            console.log('Student data sent to client')
        }
    )
});