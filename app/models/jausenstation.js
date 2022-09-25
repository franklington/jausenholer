import Model, { belongsTo, hasMany } from '@ember-data/model';

export default class JausenstationModel extends Model {

    @attr("string") username;
    @attr("string") mail;
    @attr("string") userid;


    @attr("string") name;
    @attr("string") description;

    @attr("date") ordertill;
    @attr("date") deliverytill;
 
    @hasMany("order") orders;
}
