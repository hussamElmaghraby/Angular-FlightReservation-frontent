import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../user/user.service';
import { map, catchError } from 'rxjs/operators';
import { throws } from 'assert';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../alert/alert.service';
import { Router } from '@angular/router';





@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private injector: Injector,
        private alertService: AlertService,
        private router: Router,
        private userService: UserService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let userService: UserService = this.injector.get(UserService);
        let currentUser = userService.getCurrentUser();

        if (currentUser) {

            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + currentUser.access_token) });
        }

        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

        // console.log(req);

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {

                let translate: TranslateService = this.injector.get(TranslateService);
                if (error.error.error === 'invalid_grant') {
                    translate.get('invalid_login_or_password').subscribe((message: string) => {
                        this.alertService.addAlert({ type: 'danger', message: message });
                    });
                    return throwError(error);
                }

                // if (error.status === 401) {
                //     let userService: UserService = this.injector.get(UserService);
                //     userService.logout();
                //     this.router.navigate(['/']);
                //     translate.get('not_authenticated_message').subscribe((message: string) => {
                //         this.alertService.addAlert({ type: 'danger', message: message });
                //     });

                //     return throwError(error);
                // }

                translate.get(error.error.message || 'unknown_error').subscribe((message: string) => {
                    this.alertService.addAlert({ type: 'danger', message: message });
                });

                return throwError(error);

            }));
    }

}