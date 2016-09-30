import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'aboutus.html',
    providers: [RouterModule]
})
export class AboutUsComponent {
    header = "About Us page";
}