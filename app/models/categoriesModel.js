var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CategoriesModel   = new Schema({
    // _id : {
    // 	type: Schema.Types.ObjectId
    // },
    CategoryID : {type: Number},
    CategoryName : {type: String},
    Description : {type: String},
    Picture : {type: String}
});

module.exports = mongoose.model('Categories', CategoriesModel);
