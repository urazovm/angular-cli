import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'disclaimer.component.html',
    providers: [RouterModule]
})
export class Disclaimer {
    header = "Disclaimer page";
}