import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'faq.component.html',
    providers: [RouterModule]
})
export class Faq {
    header = "FAQ page";
}