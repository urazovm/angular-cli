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
let NotificationComponent = class NotificationComponent {
    constructor(_service, _sanitizer) {
        this._service = _service;
        this._sanitizer = _sanitizer;
        ////// Locals
        // Progress bar variables
        this.progressWidth = 0;
        this.stopTime = false;
        this.count = 0;
        this.instance = () => {
            this.diff = (new Date().getTime() - this.start) - (this.count * this.speed);
            if (this.count++ === this.steps)
                this._remove();
            else if (!this.stopTime) {
                if (this.showProgressBar)
                    this.progressWidth += 100 / this.steps;
                this.timer = setTimeout(this.instance, (this.speed - this.diff));
            }
        };
    }
    ngOnInit() {
        if (this.animate)
            this.item["state"] = this.animate;
        if (this.item.override)
            this.attachOverrides();
        if (this.timeOut !== 0)
            this.startTimeOut();
        this.safeSvg = this._sanitizer.bypassSecurityTrustHtml(this.icons[this.item.type]);
    }
    startTimeOut() {
        this.steps = this.timeOut / 10;
        this.speed = this.timeOut / this.steps;
        this.start = new Date().getTime();
        this.timer = setTimeout(this.instance, this.speed);
    }
    onEnter() {
        if (this.pauseOnHover)
            this.stopTime = true;
    }
    onLeave() {
        if (this.pauseOnHover) {
            this.stopTime = false;
            setTimeout(this.instance, (this.speed - this.diff));
        }
    }
    setPosition() {
        return this.position !== 0 ? this.position * 90 : 0;
    }
    removeOnClick() {
        if (this.clickToClose)
            this._remove();
    }
    // Attach all the overrides
    attachOverrides() {
        Object.keys(this.item.override).forEach(a => this[a] = this.item.override[a]);
    }
    ngOnDestroy() { clearTimeout(this.timer); }
    _remove() {
        if (this.animate) {
            this.item["state"] = this.animate + "Out";
            setTimeout(() => this._service.set(this.item, false), 310);
        }
        else
            this._service.set(this.item, false);
    }
};
NotificationComponent = __decorate([
    core_1.Component({
        selector: "simple-notification",
        inputs: [
            "item",
            "timeOut",
            "position",
            "clickToClose",
            "maxLength",
            "showProgressBar",
            "pauseOnHover",
            "theClass",
            "rtl",
            "animate",
            "icons"
        ],
        encapsulation: core_1.ViewEncapsulation.None,
        animations: [
            core_1.trigger("enterLeave", [
                // Enter from right
                core_1.state("fromRight", core_1.style({ opacity: 1, transform: "translateX(0)" })),
                core_1.transition("* => fromRight", [
                    core_1.style({ opacity: 0, transform: "translateX(5%)" }),
                    core_1.animate("400ms ease-in-out")
                ]),
                core_1.state("fromRightOut", core_1.style({ opacity: 0, transform: "translateX(-5%)" })),
                core_1.transition("fromRight => fromRightOut", [
                    core_1.style({ opacity: 1, transform: "translateX(0)" }),
                    core_1.animate("300ms ease-in-out")
                ]),
                // Enter from left
                core_1.state("fromLeft", core_1.style({ opacity: 1, transform: "translateX(0)" })),
                core_1.transition("* => fromLeft", [
                    core_1.style({ opacity: 0, transform: "translateX(-5%)" }),
                    core_1.animate("400ms ease-in-out")
                ]),
                core_1.state("fromLeftOut", core_1.style({ opacity: 0, transform: "translateX(5%)" })),
                core_1.transition("fromLeft => fromLeftOut", [
                    core_1.style({ opacity: 1, transform: "translateX(0)" }),
                    core_1.animate("300ms ease-in-out")
                ]),
                // Rotate
                core_1.state("scale", core_1.style({ opacity: 1, transform: "scale(1)" })),
                core_1.transition("* => scale", [
                    core_1.style({ opacity: 0, transform: "scale(0)" }),
                    core_1.animate("400ms ease-in-out")
                ]),
                core_1.state("scaleOut", core_1.style({ opacity: 0, transform: "scale(0)" })),
                core_1.transition("scale => scaleOut", [
                    core_1.style({ opacity: 1, transform: "scale(1)" }),
                    core_1.animate("400ms ease-in-out")
                ]),
                // Scale
                core_1.state("rotate", core_1.style({ opacity: 1, transform: "rotate(0deg)" })),
                core_1.transition("* => rotate", [
                    core_1.style({ opacity: 0, transform: "rotate(5deg)" }),
                    core_1.animate("400ms ease-in-out")
                ]),
                core_1.state("rotateOut", core_1.style({ opacity: 0, transform: "rotate(-5deg)" })),
                core_1.transition("rotate => rotateOut", [
                    core_1.style({ opacity: 1, transform: "rotate(0deg)" }),
                    core_1.animate("400ms ease-in-out")
                ])
            ])
        ],
        template: `
        <div class="simple-notification"
            [@enterLeave]="item.state"
            (click)="removeOnClick()"
            [class]="theClass"

            [ngClass]="{
                'alert': item.type === 'alert',
                'error': item.type === 'error',
                'success': item.type === 'success',
                'info': item.type === 'info',
                'bare': item.type === 'bare',
                'rtl-mode': rtl
            }"

            (mouseenter)="onEnter()"
            (mouseleave)="onLeave()">

            <div *ngIf="!item.html">
                <div class="sn-title">{{item.title}}</div>
                <div class="sn-content">{{item.content | max:maxLength}}</div>

                <div *ngIf="item.type !== 'bare'" [innerHTML]="safeSvg"></div>
            </div>
            <div *ngIf="item.html" [innerHTML]="item.html"></div>

            <div class="sn-progress-loader" *ngIf="showProgressBar">
                <span [ngStyle]="{'width': progressWidth + '%'}"></span>
            </div>

        </div>
    `,
        styles: [`
        .simple-notification {
            width: 100%;
            padding: 10px 20px;
            box-sizing: border-box;
            position: relative;
            float: left;
            margin-bottom: 10px;
            color: #fff;
            cursor: pointer;
            transition: all 0.5s;
        }

        .simple-notification .sn-title {
            margin: 0;
            padding: 0;
            line-height: 30px;
            font-size: 20px;
        }

        .simple-notification .sn-content {
            margin: 0;
            font-size: 16px;
            padding: 0 50px 0 0;
            line-height: 20px;
        }

        .simple-notification svg {
            position: absolute;
            box-sizing: border-box;
            top: 0;
            right: 0;
            width: auto;
            height: 70px;
            padding: 10px;
            fill: #fff;
        }

        .simple-notification.rtl-mode {
            direction: rtl;
        }

        .simple-notification.rtl-mode .content {
            padding: 0 0 0 50px;
        }

        .simple-notification.rtl-mode svg {
            left: 0;
            right: auto;
        }

        .simple-notification.error { background: #F44336; }
        .simple-notification.success { background: #8BC34A; }
        .simple-notification.alert { background: #ffdb5b; }
        .simple-notification.info { background: #03A9F4; }

        .simple-notification .sn-progress-loader {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
        }

        .simple-notification .sn-progress-loader span {
            float: left;
            height: 100%;
        }

        .simple-notification.success .sn-progress-loader span { background: #689F38; }
        .simple-notification.error .sn-progress-loader span { background: #D32F2F; }
        .simple-notification.alert .sn-progress-loader span { background: #edc242; }
        .simple-notification.info .sn-progress-loader span { background: #0288D1; }
        .simple-notification.bare .sn-progress-loader span { background: #ccc; }
    `]
    }), 
    __metadata('design:paramtypes', [notifications_service_1.NotificationsService, platform_browser_1.DomSanitizationService])
], NotificationComponent);
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=notification.component.js.map