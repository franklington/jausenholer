import { Injectable } from '@angular/core';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private key = "jausenholerUser";
  constructor() { }

  public loadUser() : User {
    var res = localStorage.getItem(this.key);
    console.log("LoadUser:"+res);
    if(res){
      return JSON.parse(res) as User;
    }
    else{
      return new User();
    }
    
  }
  public setUser(user:User){
    console.log("SetUser:"+JSON.stringify(user));

    localStorage.setItem(this.key,JSON.stringify(user) );
  }
  public generateUserID(name?:string) : string{
    if(name != undefined){
      return name + new Date().getTime();

    }
    return ""+new Date().getTime();
  }
  
}
