import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PaymentService} from '../services/payment.service';
import {CacheService} from 'ng2-cache/ng2-cache';

@Component({
    templateUrl:'payment.html',
    providers: [PaymentService, RouterModule]
})
export class PaymentComponent {
    header = "Payment page";
    balance: number;

    constructor(private paymentService: PaymentService){

    }


    ngOnInit(){
        this.getBalance();
    }

    getBalance(){
        this.paymentService.getWallet()
            .subscribe(response => {
                    console.log("response" + JSON.stringify(response));
                    this.balance = (!response.amount) ? 0 : response.amount;
            });

    }

    makePayment(){
        
    }

}