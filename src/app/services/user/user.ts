import {Captcha} from '../captcha/captcha';
export interface User {
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    phoneNumber:string;
    // ? -> means that it is optional 
    captcha?: Captcha;
}
