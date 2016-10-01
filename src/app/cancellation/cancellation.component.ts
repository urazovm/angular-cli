import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'cancellation.component.html',
    providers: [RouterModule]
})
export class Cancellation {
    header = "Cancellation page";
}