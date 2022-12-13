import express from "express";

const converterRouter = express.Router();
const mysql = require("mysql");

///Create DB Connection
const db = mysql.createConnection({
    host: "localhost",
    user:"postgres",
    password:"postgres",
    database:"postgres",
    port:7676
});
db.connect();
db.query("SELECT * FROM `Users`", (results: any) => {

    console.log(results);

});
export default converterRouter;