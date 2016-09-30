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
const router_1 = require('@angular/router');
const payment_service_1 = require('../services/payment.service');
let PaymentComponent = class PaymentComponent {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.header = "Payment page";
    }
    ngOnInit() {
        this.getBalance();
    }
    getBalance() {
        this.paymentService.getWallet()
            .subscribe(response => {
            console.log("response" + JSON.stringify(response));
            this.balance = (!response.amount) ? 0 : response.amount;
        });
    }
    makePayment() {
    }
};
PaymentComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/payment/payment.html',
        directives: [router_1.RouterLink],
        providers: [payment_service_1.PaymentService]
    }), 
    __metadata('design:paramtypes', [payment_service_1.PaymentService])
], PaymentComponent);
exports.PaymentComponent = PaymentComponent;
//# sourceMappingURL=payment.component.js.map