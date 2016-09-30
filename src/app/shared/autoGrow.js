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
let AutoGrow = class AutoGrow {
    constructor() {
        this.width = 120;
    }
    onFocus() {
        this.width = 500;
    }
    onBlur() {
        this.width = 120;
    }
};
__decorate([
    core_1.HostBinding('style.width.px'), 
    __metadata('design:type', Number)
], AutoGrow.prototype, "width", void 0);
__decorate([
    core_1.HostListener('focus'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], AutoGrow.prototype, "onFocus", null);
__decorate([
    core_1.HostListener('blur'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], AutoGrow.prototype, "onBlur", null);
AutoGrow = __decorate([
    core_1.Directive({
        selector: '[autoGrow]',
    }), 
    __metadata('design:paramtypes', [])
], AutoGrow);
exports.AutoGrow = AutoGrow;
//# sourceMappingURL=autoGrow.js.map