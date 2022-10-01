export default class Bestellung {
    constructor(){
        this.products = new Array<Product>();
    }
    id?:string;
    name?: string;
    user_id?: string;
    jausenstation_id?:string;
    products: Product[];
}
export class Product{
    count?:number;
    name?: string;
}