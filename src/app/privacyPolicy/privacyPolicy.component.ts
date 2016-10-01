import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'privacy.component.html',
    providers: [RouterModule]
})
export class Privacy {
    header = "Privacy page";
}