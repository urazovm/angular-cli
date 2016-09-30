import {Component} from '@angular/core';


@Component({
    selector: 'landing',
    templateUrl: 'landing.component.html',
})
export class LandingComponent {
    header = "Landing Page";
    isLanding = true;

    ngOnInit(){
    }
}