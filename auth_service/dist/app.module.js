"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_service_1 = require("./auth/auth.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const common_2 = require("@task-project/common");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const users_controller_1 = require("./users/users.controller");
const users_module_1 = require("./users/users.module");
const rabbit_service_1 = require("./rabbit/rabbit.service");
const rabbit_controller_1 = require("./rabbit/rabbit.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController, users_controller_1.UsersController, rabbit_controller_1.AppController],
        providers: [common_2.PrismaService, auth_service_1.AuthService, rabbit_service_1.RabbitService],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env`,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map