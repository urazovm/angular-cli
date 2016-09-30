"use strict";
class SideNavDisplay {
    constructor() {
        this.isHome = false;
        this.isProfile = false;
        this.isComplaints = false;
        this.isPromotions = false;
        this.isSettings = false;
        this.isPayment = false;
        this.isRecentActivity = false;
        this.isInfo = false;
    }
    setActiveFlagsFalse() {
        this.isHome = false;
        this.isProfile = false;
        this.isComplaints = false;
        this.isPromotions = false;
        this.isSettings = false;
        this.isRecentActivity = false;
        this.isPayment = false;
        this.isInfo = false;
    }
    makeActive(path) {
        this.setActiveFlagsFalse();
        switch (path) {
            case 'Home':
                this.isHome = true;
                break;
            case 'Profile':
                this.isProfile = true;
                break;
            case 'Complaints':
                this.isComplaints = true;
                break;
            case 'Promotions':
                this.isPromotions = true;
                break;
            case 'Payment':
                this.isPayment = true;
                break;
            case 'RecentActivity':
                this.isRecentActivity = true;
                break;
            case 'Info':
                this.isInfo = true;
                break;
        }
    }
}
exports.SideNavDisplay = SideNavDisplay;
//# sourceMappingURL=sideNav.component.js.map