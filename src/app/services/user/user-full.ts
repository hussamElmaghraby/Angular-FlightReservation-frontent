import { Role } from '../role/role';

export interface UserFull {
    id: number;
    email: string;
    password:string;
    firstName:string;
    lastName:string;
    phoneNumber:number;
    roles:Role[],
    activated:boolean;
    activatationHash:string;
}