import { Component, OnInit } from '@angular/core';
import { JausenDataService } from '../services/jausen-data.service';
import  Jausenholer  from '../models/jausenholer.model';
import { FormBuilder, Validators } from '@angular/forms';
import { UserStoreService } from '../services/user-store.service';
import User from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  jausenholers : any;
  currentUser : User;
  currentTime:number;
  jausenForm = this.formBuilder.group({
    name: ["", [Validators.required]],
    mail: ["", []],
    jausenstation: ["", [Validators.required, Validators.minLength(3)]],
    delivertill: ["12:00", [Validators.required]],
    ordertill: ["11:00", [Validators.required]],
    description: [""],
  });
  constructor(private router: Router, private jausenData: JausenDataService, private formBuilder: FormBuilder, private userStore: UserStoreService) { 
    this.currentUser = userStore.loadUser();
    console.log(this.currentUser);
    this.currentTime = new Date().getTime()/1000;

    
    if(this.currentUser.name != null)
      this.jausenForm.controls['name'].setValue(this.currentUser.name)



  }

  ngOnInit(): void {
    this.jausenholers =  this.jausenData.findAllJausenholer();
  }

  newJausenstation(): void {
    console.log(this.jausenForm);
   console.log( this.jausenForm.value);
   if(this.jausenForm.valid && this.jausenForm != null){
    var jausen = this.jausenForm.value;

    if(jausen.delivertill != null && jausen.ordertill != null){

    
    var arrOrder = jausen.ordertill.split(":");
    let datOrder = new Date();
    datOrder.setHours(Number.parseInt(arrOrder[0]),Number.parseInt(arrOrder[1]));
    console.log(datOrder);
    
    
    var arrDelivery = jausen.delivertill.split(":");
    console.log(arrDelivery);
    
    let datDeliver = new Date();
    datDeliver.setHours(Number.parseInt(arrDelivery[0]),Number.parseInt(arrDelivery[1]));
    
    

    //CheckUser
    console.log("Compare User"+ this.currentUser.name +" "+ jausen.name);
    
    if((this.currentUser.name != jausen.name)){
      var name = jausen.name;
      this.currentUser = <User>({
        name: jausen.name,
        user_id: this.userStore.generateUserID(name!)
      });
      this.userStore.setUser(this.currentUser);
      console.log("set new user");
      
    }

    var jausenstation = <Jausenholer>({
      name : this.currentUser.name,
      user_id : this.currentUser.user_id,
      mail : jausen.mail,
      delivertill : datDeliver,
      ordertill : datOrder,
      jausenstation : jausen.jausenstation,
      description : jausen.description
    });
  
    this.jausenData.saveNewJausenholer(jausenstation).then(data =>{
      console.log("Hallo neuer Jausenholer");
      var id = data._key.path.segments[1];
      this.router.navigate(['/bestellen', id]);
     
      
      
    });
    this.jausenForm.reset();
    }

  
   }
   else
   {
    alert("Fehler im Formular");
   }
    
  
   
  }
 

}
