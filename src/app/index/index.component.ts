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
  isJausenholers : boolean = false;
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
    this.currentTime = new Date().getTime()/1000;

    
    if(this.currentUser.name != null)
      this.jausenForm.controls['name'].setValue(this.currentUser.name)



  }

  ngOnInit(): void {
    this.jausenholers =  this.jausenData.findAllJausenholer().then(data=>{
      if(data.length > 0)
        this.isJausenholers = true;
      return data;
    });
  }

  newJausenstation(): void {
   if(this.jausenForm.valid && this.jausenForm != null){
    var jausen = this.jausenForm.value;

    if(jausen.delivertill != null && jausen.ordertill != null){

    
    var arrOrder = jausen.ordertill.split(":");
    let datOrder = new Date();
    datOrder.setHours(Number.parseInt(arrOrder[0]),Number.parseInt(arrOrder[1]));
    
    
    var arrDelivery = jausen.delivertill.split(":");
    
    let datDeliver = new Date();
    datDeliver.setHours(Number.parseInt(arrDelivery[0]),Number.parseInt(arrDelivery[1]));
    
    

    //CheckUser
    
    if((this.currentUser.name != jausen.name)){
      var name = jausen.name;
      this.currentUser = <User>({
        name: jausen.name,
        user_id: this.userStore.generateUserID(name!)
      });
      this.userStore.setUser(this.currentUser);
      
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
      var id = data._key.path.segments[1];
      this.router.navigate(['/bestellen', id]);
     
      
      
    });
    this.jausenForm.reset();
    }

  
   }
   else
   {
    alert("Bitte Formular vollständig ausfüllen.");
   }
    
  
   
  }
 

}
