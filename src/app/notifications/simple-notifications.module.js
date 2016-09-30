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
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const notifications_service_1 = require("./notifications.service");
const simple_notifications_component_1 = require("./simple-notifications.component");
const notification_component_1 = require("./notification.component");
const max_pipe_1 = require("./max.pipe");
let SimpleNotificationsModule = class SimpleNotificationsModule {
};
SimpleNotificationsModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule],
        declarations: [simple_notifications_component_1.SimpleNotificationsComponent, notification_component_1.NotificationComponent, max_pipe_1.MaxPipe],
        providers: [notifications_service_1.NotificationsService],
        exports: [simple_notifications_component_1.SimpleNotificationsComponent],
        bootstrap: [simple_notifications_component_1.SimpleNotificationsComponent]
    }), 
    __metadata('design:paramtypes', [])
], SimpleNotificationsModule);
exports.SimpleNotificationsModule = SimpleNotificationsModule;
//# sourceMappingURL=simple-notifications.module.js.map