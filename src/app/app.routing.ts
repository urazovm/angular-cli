import { Routes, RouterModule } from '@angular/router';


import {LandingComponent} from './landing/landing.component';
import {HomeComponent} from './home/home.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {PaymentComponent} from './payment/payment.component';
import {ProfileComponent} from './profile/profile.component';
import {SearchComponent} from './search/search.component';
import {SignUpComponent} from './signUp/signUp.component';
import {Info} from './info/info.component';
import {AboutUs} from './aboutUs/aboutUs.component';
import {Cancellation} from './cancellation/cancellation.component';
import {Disclaimer} from './disclaimer/disclaimer.component';
import {Faq} from './faq/faq.component';
import {Privacy} from './privacyPolicy/privacyPolicy.component';
import {Terms} from './terms/terms.component';

const appRoutes: Routes = [
    { path: 'rooster', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { path: 'promotions', component: PromotionsComponent },
    { path: 'complaints', component: ComplaintsComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'search/:searchKey', component: SearchComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'info', component: Info },
    { path:	'info/aboutUs', component: AboutUs },
    { path:	'info/cancellation', component: Cancellation },
    { path:	'info/disclaimer', component: Disclaimer },
    { path:	'info/faq', component: Faq },
    { path:	'info/privacy', component: Privacy },
    { path:	'info/terms', component: Terms },
    { path:	'', component: LandingComponent } 
];

export const appRoutingProviders: any[] = [
];


export const routing = RouterModule.forRoot(appRoutes);