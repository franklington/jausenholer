export default class Jausenholer {
    constructor(name?:string,mail?:string,jausenstation?:string,ordertill?:Date, deliverytill?:Date, description?:string){
        this.name= name;
        this.mail = mail;
        this.jausenstation=jausenstation;
        this.ordertill=ordertill;
        this.deliverytill=deliverytill;
        this.description=description;
    }
    id?: string;
    user_id?: string;
    name?: string;
    mail?: string;
    jausenstation?: string;
    ordertill?: Date;
    deliverytill?: Date;
    description?: string;
}
