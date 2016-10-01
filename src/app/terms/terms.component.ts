import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'terms.component.html',
    providers: [RouterModule]
})
export class Terms {
    header = "Terms page";
}