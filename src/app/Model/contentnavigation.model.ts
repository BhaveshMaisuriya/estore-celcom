export class ContentNavigationInfo {
  //  Data:any;
    IsAngularNavigation: boolean;
    IsOldWebSideNavigation: boolean;
    IsUrlContainsBetaWebSiteLink: boolean;
    IsHttpOrHttps: boolean;
    Url: string;
}
export class ContentNavigation {
    // Data:any;
    private OldWebSiteLink= 'www.celcom.com.my';
    private BetaWebsiteLink = 'beta.celcom.com.my';
    private IsLinkContainsHttpOrHttps: boolean;
    private IsAngularNavigation: boolean;
    private IsOldWebSideNavigation: boolean;
    constructor() {

    }

    public ManagePageRedirection(data: any): ContentNavigationInfo {
        const result = new ContentNavigationInfo();
        result.Url = data;
        this.IsLinkContainsHttpOrHttps = this.IsUrlContainsHttpOrHttps(result.Url);

        if (this.IsLinkContainsHttpOrHttps) {
            result.IsHttpOrHttps = true;
            result.IsAngularNavigation = false;
            // this.IsOldWebSideNavigation = this.IsUrlContainsOldWebSiteLink(result.Url);
            result.IsUrlContainsBetaWebSiteLink = false; // this.IsUrlContainsBetaWebSiteLink(result.Url);
            result.IsOldWebSideNavigation = false;
            if (this.IsOldWebSideNavigation) {
                result.IsAngularNavigation = false;
            }
        } else {
            result.IsUrlContainsBetaWebSiteLink = false;
            result.IsHttpOrHttps = false;
            result.IsOldWebSideNavigation = false;
            result.IsAngularNavigation = true;
        }
        return result;
    }

    private NavigationInfo(): void {
        return;
    }
    private IsUrlContainsOldWebSiteLink(url: string): boolean {
        // let result:boolean = ;
        return url.indexOf(this.OldWebSiteLink) > -1;
    }

    private IsUrlContainsBetaWebSiteLink(url: string): boolean {
        return url.indexOf(this.BetaWebsiteLink) > -1;
    }

    private IsUrlContainsHttpOrHttps(navLink: string): boolean {
        const linkRegExpression = /(http(s?))\:\/\//gi;
        return linkRegExpression.test(navLink);
    }
}
