import express from "express";

const converterRouter = express.Router();
const mysql = require("mysql");

///Create DB Connection
const db = mysql.createConnection({
    host: "23.97.194.191",
    user:"vm001admin",
    password:"oEXfpxSTxdFKNq101!",
    database:"postgres",
    port:22
});
db.connect();
db.query("SELECT * FROM `Users`", (results: any) => {

    console.log(results);

});
export default converterRouter;