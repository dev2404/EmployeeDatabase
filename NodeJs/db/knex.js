const knex = require("knex");

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "empdb.sqlite3"
    }
});

module.exports = connectedKnex;