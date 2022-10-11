const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors())
app.use(bodyParser())

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
})

conn.connect(err => {
    if(err) {
        console.log(err)
    } else {
        console.log('db conntected')
    }
})

app.listen(8000, () => {console.log('app started')})

let dbData;
    conn.query('SELECT * FROM UsersList', (err, result, field) => {
        dbData = result
    })

app.get('/', (req, res) => {
    res.send(dbData)
})
app.post('/add', (req, res) => {
    let data = [req.body.id, req.body.FirstName, req.body.MiddleName, req.body.LastName]
    conn.query('INSERT INTO `UsersList`(`id`, `FirstName`, `MiddleName`, `LastName`) VALUES (?,?,?,?)', data, (err, result, fields) => {
        !err ? res.json(result) : res.json(err)
    })
})
