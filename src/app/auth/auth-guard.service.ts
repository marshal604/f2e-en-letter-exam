import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@core/services/user.service';
import { UserRole } from '@gql-models/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  permissionPath = ['config'];
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userInfo = this.userService.getUserInfo();
    if (!userInfo) {
      return false;
    }

    if (
      this.permissionPath.includes(route.routeConfig.path) &&
      userInfo.role > UserRole.Administrator
    ) {
      return false;
    }

    return true;
  }
}
