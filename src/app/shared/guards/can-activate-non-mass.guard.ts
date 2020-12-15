import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../../Service/user.service";

type TAgentType = "csAgent" | "dealer" | "enterprise" | "mass";

@Injectable({
  providedIn: 'root'
})
export class CanActivateNonMassGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const agentType: TAgentType = this.userService.isCSAgent()
      ? "csAgent"
      : this.userService.isDealer()
        ? "dealer"
        : this.userService.isUserEnterprise()
          ? "enterprise"
          : "mass";

    if (agentType === "mass") {
      return this.router.createUrlTree([ next.data.onDeactivate.redirect ]);
    }

    return true;
  }
}
