import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { User } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { CaptchaService } from 'src/app/services/captcha/captcha.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner"; 
import { Captcha } from 'src/app/services/captcha/captcha';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userData: User = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    captcha: {
      id: 0,
      captcha: ''
    }
  }

  emailExists: any = { value: '' };

  repeatedPassword: any = { value: '' }
  // repestedPassword = { value='' };

  @ViewChild('captchaImage', { static: true })
  captchaImage: ElementRef;

  constructor(
    private userService: UserService,
    private captchaService: CaptchaService,
    private alertService: AlertService,
    public activeModal: NgbActiveModal,
    private spinnerService: NgxSpinnerService,
    private viewContainerRef: ViewContainerRef
    ) { }



  ngOnInit() {
    this.showNewCaptcha();
  }


  refreshCaptcha() {
    this.showNewCaptcha();
  }

  showNewCaptcha() {
    this.captchaService.getCaptcha().subscribe(
      (captcha: Captcha) => {
        this.userData.captcha.id = captcha.id;
        this.captchaImage.nativeElement.src = 'data:image/png;base64,' + captcha.captchaImage;
      }
    );
  }

  registerUser(valid: boolean) {
    
    if (!valid) {
      return;
    }
    this.spinnerService.show();
    this.userService.register(this.userData).subscribe(() => {
      this.alertService.addAlert({
        type: 'success',
        message: 'An e-mail has been send to you with activation link. ' +
          'You have to activate your e-mail address before you will be able to login.'
      });
      this.activeModal.dismiss();
      this.spinnerService.hide();
      
    }, (error: HttpErrorResponse) => {
      if (error && error.error.message === 'Invalid_Captcha') {
        this.showNewCaptcha();
        this.userData.captcha.captcha = '';
        
      }
      this.spinnerService.hide();
    }
    );
    
  }


}
