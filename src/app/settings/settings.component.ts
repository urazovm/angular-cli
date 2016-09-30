import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    templateUrl: 'app/settings/settings.html',
    directives: [RouterLink]
})
export class SettingsComponent {
    header = "Settings page";
}