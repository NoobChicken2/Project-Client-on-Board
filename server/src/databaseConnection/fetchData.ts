const {Client} = require('pg')

function fetchTableData(tableName: string) {

    const client = new Client({
        host: "localhost",
        user: "admin",
        password: "admin123",
        database: "postgres",
        port: 7000
    })

    client.connect()
        .then(() => console.log("Success"))
        .then(() => client.query(`select *
                                  from ${tableName}`))
        .then((results: { rows: any }) => console.table(results.rows))
        .catch((e: any) => console.log(e))
        .then(() => client.end())

}

module.exports = {fetchTableData}