"use strict";
const router_1 = require('@angular/router');
const landing_component_1 = require('./landing/landing.component');
const home_component_1 = require('./home/home.component');
const promotions_component_1 = require('./promotions/promotions.component');
const complaints_component_1 = require('./complaints/complaints.component');
const payment_component_1 = require('./payment/payment.component');
const profile_component_1 = require('./profile/profile.component');
const search_component_1 = require('./search/search.component');
const signUp_component_1 = require('./signUp/signUp.component');
const info_component_1 = require('./info/info.component');
const aboutUs_component_1 = require('./aboutUs/aboutUs.component');
const cancellation_component_1 = require('./cancellation/cancellation.component');
const disclaimer_component_1 = require('./disclaimer/disclaimer.component');
const faq_component_1 = require('./faq/faq.component');
const privacyPolicy_component_1 = require('./privacyPolicy/privacyPolicy.component');
const terms_component_1 = require('./terms/terms.component');
const appRoutes = [
    { path: 'rooster', component: landing_component_1.LandingComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'promotions', component: promotions_component_1.PromotionsComponent },
    { path: 'complaints', component: complaints_component_1.ComplaintsComponent },
    { path: 'payment', component: payment_component_1.PaymentComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'search/:searchKey', component: search_component_1.SearchComponent },
    { path: 'signUp', component: signUp_component_1.SignUpComponent },
    { path: 'info', component: info_component_1.InfoComponent },
    { path: 'info/aboutUs', component: aboutUs_component_1.AboutUsComponent },
    { path: 'info/cancellation', component: cancellation_component_1.CancellationComponent },
    { path: 'info/disclaimer', component: disclaimer_component_1.DisclaimerComponent },
    { path: 'info/faq', component: faq_component_1.FaqComponent },
    { path: 'info/privacy', component: privacyPolicy_component_1.PrivacyComponent },
    { path: 'info/terms', component: terms_component_1.TermsComponent },
    { path: '', component: landing_component_1.LandingComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map