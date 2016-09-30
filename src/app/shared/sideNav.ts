    
    
export class SideNavDisplay{
    isHome: boolean = false;
    isProfile: boolean = false;
    isComplaints: boolean = false;
    isPromotions: boolean = false;
    isSettings: boolean = false;
    isPayment: boolean = false;
    isRecentActivity: boolean = false;
    isInfo: boolean = false;

    setActiveFlagsFalse(){
        this.isHome = false;
        this.isProfile = false;
        this.isComplaints = false;
        this.isPromotions = false;
        this.isSettings = false;
        this.isRecentActivity = false;
        this.isPayment = false;
        this.isInfo = false;
    }

    makeActive(path: string){
        this.setActiveFlagsFalse();
        switch(path){
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