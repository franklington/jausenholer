import { Injectable } from '@angular/core';
import { Firestore,query,where,deleteDoc,orderBy,getDoc,setDoc,addDoc,getDocs, doc,docData,collectionData, collection, CollectionReference, DocumentData, DocumentReference } from '@angular/fire/firestore';
//import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { setSyntheticLeadingComments } from 'typescript';
import Bestellung from '../models/bestellung.model';

import Jausenholer from "../models/jausenholer.model";


@Injectable({
  providedIn: 'root'
})
export class JausenDataService {

  private jausenholerCollection : CollectionReference;
  constructor(private db:Firestore) {
    this.jausenholerCollection = collection(db,"jausenholer");
    
  }

  async findAllJausenholer():Promise<Jausenholer[]> {
      var todayAtMidnight = new Date();
      todayAtMidnight.setHours(0,0,0,1);

      const q = query(this.jausenholerCollection, orderBy("ordertill","desc"), where("ordertill", ">", todayAtMidnight));

      const querySnapshot = await getDocs(q);


      return querySnapshot.docs.map(doc => { 
        var jaus = doc.data() as Jausenholer;
        jaus.id = doc.id;
        return jaus;
      });
  }

 

  async findAllBestellungen(id:string):Promise<Bestellung[]> {
    const q = query(collection(this.db,"bestellungen"), where("jausenstation_id", "==", id ));

    const querySnapshot = await getDocs(q);


    return querySnapshot.docs.map(doc => { 
      var jaus = doc.data() as Bestellung;
      jaus.id = doc.id;
      
      return jaus;
    });
}
  async saveNewJausenholer(jausen : Jausenholer) : Promise<any>{
    return await (await addDoc(this.jausenholerCollection, {...jausen})).withConverter(jausenholerCoverter);
  }

  async createBestellung(bestell : Bestellung) : Promise<any>{
    return await (await addDoc(collection(this.db,"bestellungen"), {...bestell}));
  }

  async getJausenholerById(id:string):Promise<Jausenholer>{
  const docRef = doc(this.db, "jausenholer", id).withConverter(jausenholerCoverter);
  const docSnap =  await getDoc(docRef);
  if (docSnap.exists()) {
    
    return docSnap.data();
    // Use a City instance method
  } else {
    return new Jausenholer();
  }
  
 }

 async deleteBestellung(id:string) : Promise<any>{
    return await deleteDoc(doc(this.db, "bestellungen", id));
 }
}


const jausenholerCoverter = {
  toFirestore: (jaus : Jausenholer) => {
      return {
          name: jaus.name,
          mail: jaus.mail,
          jausenstation: jaus.jausenstation,
          deliverytill: jaus.deliverytill,
          ordertill: jaus.ordertill,
          description: jaus.description,
          user_id: jaus.user_id,
          
          };
  },
  fromFirestore: (snapshot:any, options:any) => {
      const data = snapshot.data(options);
      var jaus = new Jausenholer(data.name, data.mail, data.jausenstation, data.ordertill, data.delivertill, data.description);
      jaus.id = snapshot.id;
      jaus.user_id = data.user_id;
      return jaus;
  }
}
