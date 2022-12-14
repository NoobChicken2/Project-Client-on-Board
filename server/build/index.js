"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', function (req, res) {
    console.log(req);
    // res.send('Hello World!')
    res.json({ msg: "hello world" });
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
// copy from converter branch, testing
var pg_1 = require("pg");
var client = new pg_1.Client({
    host: "localhost",
    user: "admin",
    password: "admin123",
    database: "postgres",
    port: 7000
});
client.connect()
    .then(function () { return console.log("Success"); })
    .then(function () { return client.query("select * from users where role='CompanyAdmin'"); })
    .then(function (results) { return console.table(results.rows); })
    .catch(function (e) { return console.log(e); })
    .then(function () { return client.end(); });
