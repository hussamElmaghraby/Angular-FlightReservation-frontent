import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-activate-account',
  template: '<h3>Activating account, please wait...</h3>'
})
export class ActivateAccountComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      let hash = params['h'];
      console.log(hash);
      this.userService.activate(hash).subscribe( ()=>{
      this.alertService.addAlert({
        type: 'success',
        message: 'Account activation was successfull. You can login now!'
      });
      this.router.navigate(['/']);
    }, () => {
      this.router.navigate(['/']);
    })
  })
  }

}
