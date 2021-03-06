import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { HttpModule, XHRBackend} from '@angular/http';

import { routing }        from './app.routing';
import { appRoutingProviders }        from './app.routing';

import { AppComponent }   from './app.component';
import {HomeComponent}    from './home/home.component';
import {SignUpComponent} from './signUp/signUp.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileFeed} from './feed/feed.component';
import {LandingComponent} from './landing/landing.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {ComplaintsComponent} from './complaints/complaints.component';
import {SearchComponent} from './search/search.component';
import {PaymentComponent} from './payment/payment.component';
import {Faq} from './faq/faq.component';
import {Cancellation} from './cancellation/cancellation.component';
import {AboutUs} from './aboutUs/aboutUs.component';
import {Disclaimer} from './disclaimer/disclaimer.component';
import {Info} from './info/info.component';
import {Privacy} from './privacyPolicy/privacyPolicy.component';
import {Terms} from './terms/terms.component';

import {RoostService}     from './services/roost.service';
import {SessionService} from './services/session.service';
import {PromotionsService} from './services/promotion.service';
import {PaymentService} from './services/payment.service';
import {ComplaintsService} from './services/complaint.service';
import {UserService} from './services/user.service';
import {ConfigService} from './services/config.service';
import {SimpleNotificationsModule} from './notifications/simple-notifications.module';
import {FacebookService} from 'ng2-facebook-sdk/dist';

import {CacheService} from 'ng2-cache';
import {ModalModule} from 'ng2-modal';
import {Ng2PaginationModule} from 'ng2-pagination';
import {MdCoreModule} from '@angular2-material/core';
import {MdInputModule} from '@angular2-material/input';
import {MdRadioModule} from '@angular2-material/radio';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdCardModule} from '@angular2-material/card';

import {DatePicker} from 'ng2-datepicker';


@NgModule({
  imports: [
    BrowserModule,
    SimpleNotificationsModule,
    FormsModule,
    ModalModule,
    Ng2PaginationModule,
    routing,
    HttpModule,
    MdCoreModule,
    MdInputModule,
    MdToolbarModule,
    MdRadioModule,
    MdCardModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    ProfileComponent,
    ProfileFeed,
    LandingComponent,
    PromotionsComponent,
    ComplaintsComponent,
    SearchComponent,
    PaymentComponent,
    Info,
    Faq,
    AboutUs,
    Cancellation,
    Disclaimer,
    Privacy,
    Terms,
    DatePicker
  ],
  providers: [
    ConfigService,
    CacheService,
    RoostService,
    SessionService,
    PromotionsService,
    ComplaintsService,
    PaymentService,
    UserService,
    FacebookService,
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
