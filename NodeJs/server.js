const express = require('express');
// import bodyParser
var app = express();
const bodyParser = require('body-parser')
const cors = require('cors');


const db = require("./db/employee");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:4200"}));

//ADD Single Employee Data
app.post("/employees", async (req, res) => {
    const results = await db.addEmployee(req.body);
    res.status(201).json({ id: results[0] });
});
//Multiple Employees Data
app.get("/employees", async (req, res) => {
    try {
    const emps = await db.allEmployees();
    res.status(200).json({emps})
    }
    catch (err) {
        console.error("There was an error:", err.message);
      }
});
//Single Employee Data
app.get("/employee/:id", async (req, res) => {
    const emps = await db.singleEmployees(req.params.id, req.body);
    res.status(200).json({emps})
});
// Update Single Employee Data
app.patch("/employees/:id", async (req, res) => {
    const id = await db.updateEmployee(req.params.id, req.body)
    res.status(200).json({ id })
})
//Delete Single Employee Data
app.delete("/employees/:id", async(req ,res) => {
    await db.deleteEmployee(req.params.id);
    res.status(200).json({ success: true});
});

// app.get("/test", (req, res) =>{
//     res.status(200).json({ success:true });
// });

app.listen(3000, () => console.log('Server started at port : 3000'));


