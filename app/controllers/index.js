import Controller from '@ember/controller';
import application from '../adapters/application';
import {action} from "@ember/object";
import { service } from '@ember/service';


export default class IndexController extends Controller {
  //  @service store;

  name = "";
  mail = "";
  jausenstation = "";
  ordertill = "11:00";
  deliverytill = "12:00";
  description = "";
    

    @action 
    createJausenstation(){
        event.preventDefault();
        if(this.get("name") != "" && this.get("jausenstation") != ""){
            var arrOrdertill = this.get("ordertill").split(":");
            var arrDeliverytill = this.get("deliverytill").split(":");
    
            var datOrdertill = new Date();
            datOrdertill.setHours(arrOrdertill[0]);
            datDeliverytill.setMinutes(arrOrdertill[1]);
    
            var datOrdertill = new Date();
            datDeliverytill.setHours(arrDeliverytill[0]);
            datDeliverytill.setMinutes(arrDeliverytill[1]);
    
            let jausenholer = store.createRecord('jausenstation', {
                username: this.get('name'),
                userid: this.get('name'),
                mail: this.get('mail'),
                ordertill: this.ordertill.getTime(),
                deliverytill: datDeliverytill.getTime(),
                name: this.get('jausenstation'),
                description: this.get('description')
      
              });
            let jaus =  jausenholer.save();
        }
        else{
            alert("Bitte vollständig ausfüllen!" + this.get("name"));
        }
      
       
        return true;
    }
}
