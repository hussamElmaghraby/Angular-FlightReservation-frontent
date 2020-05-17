import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
//A service that can be used to get and set the title of a current HTML document.
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user/user.service';
import { UserToken } from './services/user/userToken';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flight-reservation';
  public login = {
    email:'',
    password:''
  }


  constructor(
    private translateService: TranslateService,
    private titleService: Title,
    private modelService : NgbModal,
    public userService: UserService,
    private router: Router

  ) {
    translateService.setDefaultLang('en-US');
    //localStorage.getItem() =>  allows you to access the data stored in the browser's localStorage object.
    translateService.use(localStorage.getItem('language') || window.navigator.language);
    translateService.onLangChange.subscribe(() => {
      translateService.get('appTitle').subscribe((title) => {
        this.setAppTitle(title);
      })
    }
    );
  }
 


  setAppTitle(appTitle) {
    this.titleService.setTitle(appTitle)
  }

  changeLanguage(code : string){
    localStorage.setItem('language' , code);
    this.translateService.use(code);
  }

  openRegisterModal(){
    this.modelService.open(RegisterComponent)
  }

  loginUser(){
    if(this.login.email && this.login.password){
      this.userService.login(this.login.email , this.login.password).subscribe( (token: UserToken)=>{
          this.login ={
            email:'',
            password:''
          }
      })
    }
  }

  logout(){
      this.userService.logout();
      this.router.navigate(['/']);
  }

 
}
