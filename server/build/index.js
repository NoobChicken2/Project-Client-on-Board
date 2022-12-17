"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var ticket_1 = __importDefault(require("./routes/ticket"));
var companyAdministrators_1 = __importDefault(require("./routes/companyAdministrators"));
var app = (0, express_1.default)();
var port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/tickets', ticket_1.default);
app.use('/companyAdmins', companyAdministrators_1.default);
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
