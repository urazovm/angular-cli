import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'info.component.html',
    providers: [RouterModule]
})
export class Info {
    header = "Info page";
}