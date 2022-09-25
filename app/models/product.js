import Model, { belongsTo, hasMany } from '@ember-data/model';

export default class ProductModel extends Model {

    @attr("string") name;
    @attr("number") count;
    @belongsTo("order") order;
}
