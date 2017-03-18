/**
 * Created by Vardhman on 3/9/2017.
 */

module.exports = function(){
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username : String,
        password : String,
        firstname : String,
        lastname : String,
        email : String,
        phone : String,
        websites : [{type : mongoose.Schema.Types.ObjectId, ref : 'webdev.assignment.website'}],
        dateCreated : {type : Date , default : Date.now()}
    }, {collection : 'webdev.assignment.user'});

    return UserSchema;
};
