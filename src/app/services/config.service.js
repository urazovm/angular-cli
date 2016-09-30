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
const core_1 = require('@angular/core');
require('rxjs/add/operator/map');
const http_1 = require('@angular/http');
let ConfigService = class ConfigService {
    constructor(http) {
        this.http = http;
    }
    getEnv(key) {
        return this.http.get('/app/config/env.json')
            .map(res => res.json());
    }
    get(key) {
        return this.http.get('/app/config/config.json')
            .map((res) => res.json());
    }
};
ConfigService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], ConfigService);
exports.ConfigService = ConfigService;
;
//# sourceMappingURL=config.service.js.map