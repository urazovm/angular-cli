import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'terms.html',
    providers: [RouterModule]
})
export class TermsComponent {
    header = "Terms page";
}