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
exports.Project = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const positions_1 = require("./positions");
let Project = class Project extends sequelize_typescript_1.Model {
    getPositions() {
        return positions_1.Position.findAll({
            where: {
<<<<<<< HEAD
                project: this.id,
=======
                id_project: this.id,
>>>>>>> 32d082879f0968f51d34d2cab98d0d4d001b665f
            },
        });
    }
};
exports.Project = Project;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Project.prototype, "title_project", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Project.prototype, "description_project", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Project.prototype, "tariff_project", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Project.prototype, "publicationDate_project", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Project.prototype, "deadline_project", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => positions_1.Position),
    __metadata("design:type", Array)
], Project.prototype, "positions", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Project.prototype, "project_status", void 0);
exports.Project = Project = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "Projects",
    })
], Project);
