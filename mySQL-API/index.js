const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
app.use(cors({origin:"http://localhost:4200"}));


app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'deeshu',
    password: 'Sharma@2404',
    database: 'employeedb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


//Get all employees
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an employees
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an employees
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/employees', (req, res) => {
    const body = req.body
    mysqlConnection.query('INSERT INTO employee SET ?', body , (err, rows, fields) => {
        
        if (!err)
            res.send('Records Add successfully.');
        else
            console.log(err);
    })
});

//Update an employees
app.put('/emloyees', (req, res) => {
    const { id, Name, Office, Salary} = req.body
    mysqlConnection.query('UPDATE employee SET Name = ?, Office = ?, Salary = ? WHERE id = ?' , [Name, Office, Salary, id] , (err, rows, fields) => {
        
        if (!err)
            res.send('Records Updated successfully.');
        else
            console.log(err);
    })
});
