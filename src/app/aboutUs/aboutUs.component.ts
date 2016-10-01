import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
    templateUrl:'aboutUs.component.html',
    providers: [RouterModule]
})
export class AboutUs {
    header = "About Us page";
}