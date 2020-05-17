import { Connection } from '../connections/connections';
import { UserFull } from '../user/user-full';
export interface Ticket {
    id?:number;
    connection: Connection;
    price:number;
    reservationDate: string;
    ticketNumber: string; 
    user:UserFull
}