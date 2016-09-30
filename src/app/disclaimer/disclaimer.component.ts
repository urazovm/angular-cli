import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'disclaimer.html',
    providers: [RouterModule]
})
export class DisclaimerComponent {
    header = "Disclaimer page";
}