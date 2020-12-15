import {UserService} from "../../Service/user.service";
import {IBlacklist} from "../models/user.model";
import {ModalService} from "../components/modal/modal.service";
import {HttpClient} from "@angular/common/http";
import {HOST} from "../../Service/app.service";
import {Observable} from "rxjs";
import {IReserveNumberResponse} from "../models/numbers.model";

type TIsInternallyBlacklist = (userService: UserService) => IBlacklist | null;
type TSelectTypeOfPurchase = (userService: UserService, modalService: ModalService, callback?: () => void) => void;
type TRserveRandomNumbers = (http: HttpClient) => Observable<IReserveNumberResponse>

export const isInternallyBlacklist: TIsInternallyBlacklist = userService => {
  const userInfo = userService.getPersonalForm();

  // ? User that are not logged in at this point can't be checked
  // ? follow-up check for those will be in their respective type of purchase wrapper
  const blacklistDatum = userInfo?.type === 'user'
    ? userInfo.data.outputCPResp.blacklist
    : null;

  // ? if user is internally blacklisted,
  // ? show an error popup and return void
  if (blacklistDatum?.status && blacklistDatum?.system === "Internal") {
    return blacklistDatum;
  }

  return null
}

export const selectTypeOfPurchase: TSelectTypeOfPurchase = (userService, modalService, callback) => {
  const blacklistDatum = isInternallyBlacklist(userService);

  if (blacklistDatum !== null) {
    modalService.showError({ title: 'Uh Oh!', message: blacklistDatum.message });
    return;
  }

  callback();
}
