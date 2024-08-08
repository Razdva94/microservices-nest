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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let RabbitService = class RabbitService {
    constructor(client) {
        this.client = client;
    }
    async sendToken(req) {
        const authHeader = req.headers?.authorization;
        const token = authHeader.split(' ')[1];
        const observable = this.client.send('send_token', token);
        const user = await (0, rxjs_1.firstValueFrom)(observable);
        return user;
    }
};
exports.RabbitService = RabbitService;
exports.RabbitService = RabbitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_INFO_TRANSPORT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], RabbitService);
//# sourceMappingURL=rabbit.service.js.map