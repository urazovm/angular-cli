import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'cancel.html',
    providers: [RouterModule]
})
export class CancellationComponent {
    header = "Cancellation page";
}