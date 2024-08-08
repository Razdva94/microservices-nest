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
exports.EventInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rabbit_service_1 = require("../rabbit/rabbit.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let EventInterceptor = class EventInterceptor {
    constructor(rabbitService, eventEmitter) {
        this.rabbitService = rabbitService;
        this.eventEmitter = eventEmitter;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        console.log('3');
        const eventPattern = 'send_user_info';
        const userInfoPromise = new Promise((resolve) => {
            this.eventEmitter.once(eventPattern, (data) => resolve(data));
        });
        console.log('2');
        const userInfo = await userInfoPromise;
        request.userInfo = userInfo;
        console.log(userInfo);
        return next.handle();
    }
};
exports.EventInterceptor = EventInterceptor;
exports.EventInterceptor = EventInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rabbit_service_1.RabbitService,
        event_emitter_1.EventEmitter2])
], EventInterceptor);
//# sourceMappingURL=event.interceptor.js.map