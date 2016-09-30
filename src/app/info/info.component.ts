import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'info.html',
    providers: [RouterModule]
})
export class InfoComponent {
    header = "Info page";
}