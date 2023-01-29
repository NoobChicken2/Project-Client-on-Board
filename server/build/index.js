"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var ticket_1 = __importDefault(require("./routes/ticket"));
var companyAdministrators_1 = __importDefault(require("./routes/companyAdministrators"));
var converters_1 = __importDefault(require("./routes/converters"));
var customers_1 = __importDefault(require("./routes/customers"));
var companies_1 = __importDefault(require("./routes/companies"));
var token_1 = __importDefault(require("./routes/token"));
var global_1 = __importDefault(require("./routes/global"));
var fetchStatusCronJob_1 = require("./cron/fetchStatusCronJob");
var fetchThroughputCronJob_1 = require("./cron/fetchThroughputCronJob");
var app = (0, express_1.default)();
var port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/tickets', ticket_1.default);
app.use('/companyAdmins', companyAdministrators_1.default);
app.use('/converters', converters_1.default);
app.use('/customers', customers_1.default);
app.use('/token', token_1.default);
app.use('/companies', companies_1.default);
app.use('/users', global_1.default);
app.get('/converters', function () {
});
app.listen(port, function () {
    console.log("Backend API listening on port ".concat(port));
});
(0, fetchStatusCronJob_1.runUpdateStatusCronJob)();
(0, fetchThroughputCronJob_1.runUpdateThroughputCronJob)();
