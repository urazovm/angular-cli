import { Routes, RouterModule } from '@angular/router';


import {LandingComponent} from './landing/landing.component';
import {HomeComponent} from './home/home.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {PaymentComponent} from './payment/payment.component';
import {ProfileComponent} from './profile/profile.component';
import {SearchComponent} from './search/search.component';
import {SignUpComponent} from './signUp/signUp.component';
import {InfoComponent} from './info/info.component';
import {AboutUsComponent} from './aboutUs/aboutUs.component';
import {CancellationComponent} from './cancellation/cancellation.component';
import {DisclaimerComponent} from './disclaimer/disclaimer.component';
import {FaqComponent} from './faq/faq.component';
import {PrivacyComponent} from './privacyPolicy/privacyPolicy.component';
import {TermsComponent} from './terms/terms.component';

const appRoutes: Routes = [
    { path: 'rooster', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { path: 'promotions', component: PromotionsComponent },
    { path: 'complaints', component: ComplaintsComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'search/:searchKey', component: SearchComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'info', component: InfoComponent },
    { path:	'info/aboutUs', component: AboutUsComponent },
    { path:	'info/cancellation', component: CancellationComponent },
    { path:	'info/disclaimer', component: DisclaimerComponent },
    { path:	'info/faq', component: FaqComponent },
    { path:	'info/privacy', component: PrivacyComponent },
    { path:	'info/terms', component: TermsComponent },
    { path:	'', component: LandingComponent } 
];

export const routing = RouterModule.forRoot(appRoutes);