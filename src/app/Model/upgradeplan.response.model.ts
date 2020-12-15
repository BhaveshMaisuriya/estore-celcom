export class UpgradePlanResponse{
    //business logic properties
    IsAmountDue:boolean;
    IsAnyOrderOpen:boolean; 
    IsMyPlanExistInUpgradePlanList:boolean;
    //ui properties
    IsEligibleToUpgrade:boolean;
    Message:string;
    constructor(){
    }
}