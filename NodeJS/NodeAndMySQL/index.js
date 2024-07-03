const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()

app.use(express.json())

app.use((req, res, next) =>{
    setTimeout(next, 500)
})

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
            students.id,
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

app.get("/students/:id", (req, res) => {
    const { id } = req.params;

    con.query("SELECT * FROM students WHERE id = ?", [id], (err, result) => {
        if (err) {
            throw err;
        }

        const user = result.pop();

        con.query("SELECT test_grades.id, tests.id AS testId, tests.name, test_grades.grade FROM test_grades LEFT JOIN tests ON tests.id = test_grades.testId WHERE test_grades.studentId = ?", [id], (err, grades) => {
            if (err) {
                throw err;
            }
    
            res.send({
                user,
                grades
            });
        });
    });
})

app.put('/students/:studentId', (req, res) => {
    const { studentId } = req.params;
    const grades = req.body;

    for (const g of grades) {
        con.query('UPDATE test_grades SET grade = ? WHERE id = ? AND studentId = ?', [g.grade, g.id, studentId] )
    }
    res.send({})
})

app.get('/dashboard/students/amount', (req, res) => {
    con.query('SELECT COUNT(*) amount FROM students', 
    (err, results) => {
        if (err) {
            throw err 
        }
        res.send(results[0].amount.toString())
    })
})
app.get('/dashboard/cities/amount', (req, res) => {
    con.query('SELECT COUNT(DISTINCT city) amount FROM students', 
    (err, results) => {
        if (err) {
            throw err 
        }
        res.send(results[0].amount.toString())
    })
})
app.get('/dashboard/tests/amount', (req, res) => {
    con.query('SELECT COUNT(*) amount FROM tests', 
    (err, results) => {
        if (err) {
            throw err 
        }
        res.send(results[0].amount.toString())
    })
})
app.get('/dashboard/tests/avg', (req, res) => {
    con.query('SELECT AVG(grade) avg FROM test_grades', 
    (err, results) => {
        if (err) {
            throw err 
        }
        res.send(results[0].avg.toString())
    })
})
app.get('/dashboard/students/the-best', (req, res) => {
    con.query(`
            SELECT
                s.firstName,
                s.lastName,
                AVG(tg.grade) grade
            FROM test_grades AS tg
            LEFT JOIN students AS s
            ON s.id = tg.studentId
            GROUP BY s.id
            ORDER BY grade DESC
            LIMIT 1`, 
    (err, results) => {
        if (err) {
            throw err 
        }
        res.send(results.pop())
    })
})
app.get('/dashboard/cities/the-best', (req, res) => {
    con.query(`
            SELECT
                s.city,
                AVG(tg.grade) grade
            FROM test_grades AS tg
            LEFT JOIN students AS s
            ON s.id = tg.studentId
            GROUP BY s.city
            ORDER BY grade DESC
            LIMIT 1`, 
    (err, results) => {
        if (err) {
            throw err 
        }
        res.send(results.pop())
    })
})
app.get('/dashboard/students/birthday', (req, res) => {
    con.query(`
        SELECT firstName, lastName, 
        TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS age 
        FROM students WHERE MONTH(birthday) = MONTH(CURRENT_DATE);`,
            (err, results) => {
        if (err) {
            throw err 
        }
        res.send(results)
    })
})

app.get('/tests', (req, res) => {
    con.query(`SELECT tests.id, tests.name, AVG(test_grades.grade) AS avg
                FROM tests
                LEFT JOIN test_grades
                ON tests.id = test_grades.testId
                GROUP BY tests.id
            `, (err, results) => {
        if (err) {
            throw err
        }
        res.send(results)
        console.log('Tests data sent to client')
    })
});

app.post("/students/test", (req, res) => {
    const { studentID, testId, grade } = req.body;
    con.query("INSERT INTO test_grades(testId, studentId, grade) VALUES (?, ?, ?)", [testId, studentID, grade], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({
            id: result.insertId,
            testId: +testId,
            grade: +grade,
        })
    });
});

app.delete("/students/:studentId/test/:testId", (req, res) => {
    const { studentId, testId } = req.params;
    con.query("DELETE FROM test_grades WHERE id = ? AND studentId = ?", [testId, studentId], (err, result) => {
        if (err) {
            throw err;
        }
        res.end();
    });
});