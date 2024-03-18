"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const projects_1 = require("../models/projects");
const positions_1 = require("../models/positions");
const user_1 = require("../models/user");
const connection = new sequelize_typescript_1.Sequelize({
    database: "sisweb_db",
    dialect: "postgres",
    username: "sisweb_user",
    password: "HDK#$%Ljkwerff.89",
    storage: ":memory:",
    models: [projects_1.Project, positions_1.Position, user_1.User],
});
function connectionDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection.sync({ alter: true }); // Disabled when you're turning into production mode
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.default = connectionDB;
