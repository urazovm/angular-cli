import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'faq.html',
    providers: [RouterModule]
})
export class FaqComponent {
    header = "FAQ page";
}