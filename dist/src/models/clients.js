"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const projects_1 = require("./projects");
let Client = class Client extends sequelize_typescript_1.Model {
    getProjects() {
        return projects_1.Project.findAll({
            where: {
                id_client: this.id,
            },
        });
    }
};
exports.Client = Client;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "contract_pdf_url", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "logo_url", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "client_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "client_desc", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "exclusivity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Client.prototype, "high_growth", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "division", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Client.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Client.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => projects_1.Project),
    __metadata("design:type", Array)
], Client.prototype, "projects", void 0);
exports.Client = Client = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "Clients",
    })
], Client);
