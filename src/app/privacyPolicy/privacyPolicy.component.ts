import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'privacy.html',
    providers: [RouterModule]
})
export class PrivacyComponent {
    header = "Privacy page";
}