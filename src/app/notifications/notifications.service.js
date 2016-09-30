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
const Rx_1 = require('rxjs/Rx');
let NotificationsService = class NotificationsService {
    constructor() {
        this._emitter = new Rx_1.Subject();
    }
    set(notification, to) {
        notification.id = notification.override && notification.override.id ? notification.override.id : Math.random().toString(36).substring(3);
        this._emitter.next({ command: "set", notification: notification, add: to });
        return notification;
    }
    ;
    getChangeEmitter() { return this._emitter; }
    //// Access methods
    success(title, content, override) { return this.set({ title: title, content: content, type: "success", override: override }, true); }
    error(title, content, override) { return this.set({ title: title, content: content, type: "error", override: override }, true); }
    alert(title, content, override) { return this.set({ title: title, content: content, type: "alert", override: override }, true); }
    info(title, content, override) { return this.set({ title: title, content: content, type: "info", override: override }, true); }
    bare(title, content, override) { return this.set({ title: title, content: content, type: "bare", override: override }, true); }
    // With type method
    create(title, content, type, override) { return this.set({ title: title, content: content, type: type, override: override }, true); }
    // HTML Notification method
    html(html, type, override) { return this.set({ html: html, type: type, override: override, title: null, content: null }, true); }
    // Remove all notifications method
    remove(id) {
        if (id)
            this._emitter.next({ command: "clean", id: id });
        else
            this._emitter.next({ command: "cleanAll" });
    }
};
NotificationsService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map