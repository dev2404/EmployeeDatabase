const knex = require("./knex");

function addEmployee(emp) {
    return knex("emp").insert(emp);
};

function allEmployees() {
    return knex("emp").select("*");
};

function singleEmployees(id) {
    return knex("emp").where("id", id)
};

function deleteEmployee(id) {
    return knex("emp").where("id", id).del();
};

function updateEmployee(id, emp) {
    return knex("emp").where("id", id).update(emp)
};

module.exports = {
    addEmployee,
    deleteEmployee,
    allEmployees,
    updateEmployee,
    singleEmployees
}
