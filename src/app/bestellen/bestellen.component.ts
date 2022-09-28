import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Bestellung, { Product } from '../models/bestellung.model';
import Jausenholer from '../models/jausenholer.model';
import User from '../models/user.model';
import { JausenDataService } from '../services/jausen-data.service';
import { UserStoreService } from '../services/user-store.service';


@Component({
  selector: 'app-bestellen',
  templateUrl: './bestellen.component.html',
  styleUrls: ['./bestellen.component.scss']
})
export class BestellenComponent implements OnInit {
  jausenholer_id: string;
  jausenholer: any;
  bestellungen: any;
  currentUser: User;
  currentTime: number;

  bestellenForm = this.formBuilder.group({
    name: ["", [Validators.required]],
    products: this.formBuilder.array([this.createProduct()],Validators.required)
  });
  createProduct(): FormGroup {

    return this.formBuilder.group({
      count:[1,Validators.required],
      name:[null,Validators.required]
    })
  }
  addProduct() {
    this.products.push(this.createProduct());
  }

  removeProduct(index:number) {
    this.products.removeAt(index);
  }
  get products():FormArray{
    return <FormArray> this.bestellenForm.get('products');
  }

  constructor(private userStore:UserStoreService,private actRoute: ActivatedRoute, private formBuilder: FormBuilder,private jausenData: JausenDataService,) {
    this.jausenholer_id = this.actRoute.snapshot.params['id'];
    this.jausenData.getJausenholerById(this.jausenholer_id).then(data => {
      console.log(data);
  
      this.jausenholer = data;

    
    });
      //loadUser
      this.currentTime= new Date().getTime()/1000;
      console.log(this.currentTime);
      

    this.currentUser = userStore.loadUser();
    console.log(this.currentUser);
    
    if(this.currentUser.name)
      this.bestellenForm.controls['name'].setValue(this.currentUser.name)
  }
  ngOnInit(): void {
    console.log(this.jausenholer_id);
    this.refreshBestellungen();

    
  }

  refreshBestellungen():void{
    this.bestellungen =  this.jausenData.findAllBestellungen(this.jausenholer_id);

  }

  deleteBestellung(id:string):void{
    this.jausenData.deleteBestellung(id).then(()=>{
      this.refreshBestellungen();
    });

  }

  createBestellung():void{
    if(this.bestellenForm.valid && this.bestellenForm != null){
      var bf = this.bestellenForm.value;

          //CheckUser
    if((this.currentUser.name != bf.name)){
      var name = bf.name;
      this.currentUser = <User>({
        name: bf.name,
        user_id: this.userStore.generateUserID(name!)
      });
      this.userStore.setUser(this.currentUser);
    }

      var bestell = <Bestellung>({
        name: bf.name,
        jausenstation_id: this.jausenholer_id,
        user_id:this.currentUser.user_id

      });
      if(bf.products  != undefined){
        bestell.products = new Array<Product>();
        bf.products.forEach(item =>{
          var prod = item as Product;
          if(prod.name != null){
            bestell.products.push(prod);
          }
       
        });
        this.jausenData.createBestellung(bestell);
        this.refreshBestellungen();
      }
     
    }


  }

 
 

}
