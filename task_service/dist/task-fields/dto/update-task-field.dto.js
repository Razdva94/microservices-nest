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
exports.UpdateTaskFieldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class UpdateTaskFieldDto {
}
exports.UpdateTaskFieldDto = UpdateTaskFieldDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'priority', description: 'Название поля задачи' }),
    (0, class_validator_1.Length)(3, 20, { message: 'Имя должно быть от 3 до 20 символов' }),
    (0, class_validator_1.IsString)({ message: 'Имя должно быть строкой' }),
    __metadata("design:type", String)
], UpdateTaskFieldDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HIGH', description: 'Значение поля' }),
    (0, class_validator_1.ValidateIf)((o) => typeof o.value === 'string'),
    (0, class_validator_1.IsString)({ message: 'Поле значения должно быть строкой' }),
    (0, class_validator_1.ValidateIf)((o) => typeof o.value === 'number'),
    (0, class_validator_1.IsNumber)({}, { message: 'Поле значения должно быть числом' }),
    (0, class_validator_1.ValidateIf)((o) => Object.values(client_1.TaskFieldEnumOptions).includes(o.value)),
    (0, class_validator_1.IsEnum)(client_1.TaskFieldEnumOptions, {
        message: 'Поле значения должно быть одним из допустимых значений',
    }),
    __metadata("design:type", Object)
], UpdateTaskFieldDto.prototype, "value", void 0);
//# sourceMappingURL=update-task-field.dto.js.map