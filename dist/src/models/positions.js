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
exports.Position = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const projects_1 = require("./projects");
let Position = class Position extends sequelize_typescript_1.Model {
};
exports.Position = Position;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
<<<<<<< HEAD
], Position.prototype, "title_position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Position.prototype, "description_position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Position.prototype, "vacancies_position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Position.prototype, "publication_type_position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Position.prototype, "cross_division_position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Position.prototype, "division_position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Position.prototype, "region_position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Position.prototype, "tech_stack_position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Position.prototype, "demand_curation_position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Position.prototype, "is_exclusive_position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Position.prototype, "vacancy_id_position", void 0);
=======
], Position.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Position.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Position.prototype, "vacancies", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Position.prototype, "publication_type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Position.prototype, "cross_division", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Position.prototype, "division", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Position.prototype, "region", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Position.prototype, "tech_stack", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Position.prototype, "demand_curation", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Position.prototype, "exclusivity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Position.prototype, "id_vacancy", void 0);
>>>>>>> 32d082879f0968f51d34d2cab98d0d4d001b665f
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => projects_1.Project),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
<<<<<<< HEAD
], Position.prototype, "project_id_position", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => projects_1.Project),
    __metadata("design:type", projects_1.Project)
], Position.prototype, "project_position", void 0);
=======
], Position.prototype, "id_project", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => projects_1.Project),
    __metadata("design:type", projects_1.Project)
], Position.prototype, "project", void 0);
>>>>>>> 32d082879f0968f51d34d2cab98d0d4d001b665f
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Position.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Position.prototype, "updatedAt", void 0);
exports.Position = Position = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "Positions",
    })
], Position);
