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
const notifications_service_1 = require("./notifications.service");
const icons_1 = require("./icons");
let SimpleNotificationsComponent = class SimpleNotificationsComponent {
    constructor(_service) {
        this._service = _service;
        this.onCreate = new core_1.EventEmitter();
        this.onDestroy = new core_1.EventEmitter();
        this.notifications = [];
        this.position = ["bottom", "right"];
        // Received values
        this.lastOnBottom = true;
        this.maxStack = 8;
        this.preventLastDuplicates = false;
        this.preventDuplicates = false;
        // Sent values
        this.timeOut = 0;
        this.maxLength = 0;
        this.clickToClose = true;
        this.showProgressBar = true;
        this.pauseOnHover = true;
        this.rtl = false;
        this.animate = "fromRight";
        this.icons = icons_1.defaultIcons;
    }
    set options(opt) {
        this.attachChanges(opt);
    }
    ngOnInit() {
        // Listen for changes in the service
        this.listener = this._service.getChangeEmitter()
            .subscribe(item => {
            switch (item.command) {
                case "cleanAll":
                    this.notifications = [];
                    break;
                case "clean":
                    this.cleanSingle(item.id);
                    break;
                case "set":
                    if (item.add)
                        this.add(item.notification);
                    else
                        this.defaultBehavior(item);
                    break;
                default:
                    this.defaultBehavior(item);
                    break;
            }
        });
    }
    // Default behavior on event
    defaultBehavior(value) {
        this.notifications.splice(this.notifications.indexOf(value.notification), 1);
        this.onDestroy.emit(this.buildEmit(value.notification, false));
    }
    // Add the new notification to the notification array
    add(item) {
        item.createdOn = new Date();
        let toBlock = this.preventLastDuplicates || this.preventDuplicates ? this.block(item) : false;
        // Save this as the last created notification
        this.lastNotificationCreated = item;
        if (!toBlock) {
            // Check if the notification should be added at the start or the end of the array
            if (this.lastOnBottom) {
                if (this.notifications.length >= this.maxStack)
                    this.notifications.splice(0, 1);
                this.notifications.push(item);
            }
            else {
                if (this.notifications.length >= this.maxStack)
                    this.notifications.splice(this.notifications.length - 1, 1);
                this.notifications.splice(0, 0, item);
            }
            this.onCreate.emit(this.buildEmit(item, true));
        }
    }
    // Check if notifications should be prevented
    block(item) {
        let checkHtml = (checker) => checker.html ? checker.type === item.type && checker.title === item.title && checker.content === item.content && checker.html === item.html : false, checkStandard = (checker) => checker.type === item.type && checker.title === item.title && checker.content === item.content, toCheck = item.html ? checkHtml : checkStandard;
        if (this.preventDuplicates && this.notifications.length > 0)
            for (let i = 0; i < this.notifications.length; i++)
                if (toCheck(this.notifications[i]))
                    return true;
        if (this.preventLastDuplicates) {
            let comp;
            if (this.preventLastDuplicates === "visible" && this.notifications.length > 0) {
                if (this.lastOnBottom)
                    comp = this.notifications[this.notifications.length - 1];
                else
                    comp = this.notifications[0];
            }
            else if (this.preventLastDuplicates === "all" && this.lastNotificationCreated)
                comp = this.lastNotificationCreated;
            else
                return false;
            return toCheck(comp);
        }
        return false;
    }
    // Attach all the changes received in the options object
    attachChanges(options) {
        Object.keys(options).forEach(a => {
            if (this.hasOwnProperty(a))
                this[a] = options[a];
        });
    }
    buildEmit(notification, to) {
        let toEmit = {
            createdOn: notification.createdOn,
            type: notification.type,
            id: notification.id
        };
        if (notification.html)
            toEmit["html"] = notification.html;
        else {
            toEmit["title"] = notification.title;
            toEmit["content"] = notification.content;
        }
        if (!to)
            toEmit["destroyedOn"] = new Date();
        return toEmit;
    }
    cleanSingle(id) {
        let indexOfDelete, doDelete = false;
        this.notifications.forEach((a, idx) => {
            if (a.id === id) {
                indexOfDelete = idx;
                doDelete = true;
            }
        });
        if (doDelete)
            this.notifications.splice(indexOfDelete, 1);
    }
    ngOnDestroy() {
        if (this.listener)
            this.listener.unsubscribe();
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object), 
    __metadata('design:paramtypes', [Object])
], SimpleNotificationsComponent.prototype, "options", null);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], SimpleNotificationsComponent.prototype, "onCreate", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], SimpleNotificationsComponent.prototype, "onDestroy", void 0);
SimpleNotificationsComponent = __decorate([
    core_1.Component({
        selector: "simple-notifications",
        encapsulation: core_1.ViewEncapsulation.None,
        template: `
        <div class="simple-notification-wrapper" [ngClass]="position">
            <simple-notification
                *ngFor="let a of notifications; let i = index"
                [item]="a"
                [timeOut]="timeOut"
                [clickToClose]="clickToClose"
                [maxLength]="maxLength"
                [showProgressBar]="showProgressBar"
                [pauseOnHover]="pauseOnHover"
                [theClass]="theClass"
                [rtl]="rtl"
                [animate]="animate"
                [position]="i"
                [icons]="icons"
                >
            </simple-notification>
        </div>
    `,
        styles: [`
        .simple-notification-wrapper {
            position: fixed;
            width: 300px;
            z-index: 1000;
        }
        
        .simple-notification-wrapper.left { left: 20px; }
        .simple-notification-wrapper.top { top: 20px; }
        .simple-notification-wrapper.right { right: 20px; }
        .simple-notification-wrapper.bottom { bottom: 20px; }
        
        @media (max-width: 340px) {
            .simple-notification-wrapper {
                width: auto;
                left: 20px;
                right: 20px;
            }
        }
    `]
    }), 
    __metadata('design:paramtypes', [notifications_service_1.NotificationsService])
], SimpleNotificationsComponent);
exports.SimpleNotificationsComponent = SimpleNotificationsComponent;
//# sourceMappingURL=simple-notifications.component.js.map