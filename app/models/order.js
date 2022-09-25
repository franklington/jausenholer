import Model, { belongsTo, hasMany } from '@ember-data/model';

export default class OrderModel extends Model {

    @attr("string") name;
    @attr("string") mail;
    @attr("string") userid;

    @attr("date") timestamp;
 
    @hasMany("product") products;
    @belongsTo("jausenstation") jausenstation;
}
