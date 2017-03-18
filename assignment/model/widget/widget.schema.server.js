/**
 * Created by Vardhman on 3/9/2017.
 */

module.exports = function(){
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
            _page : {type : mongoose.Schema.Types.ObjectId, ref : 'webdev.assignment.page'},
            type : {type : mongoose.Schema.Types.String, enum : ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
            name : mongoose.Schema.Types.String,
            text : mongoose.Schema.Types.String,
            placeholder : mongoose.Schema.Types.String,
            description : mongoose.Schema.Types.String,
            url : mongoose.Schema.Types.String,
            width : mongoose.Schema.Types.String,
            height : mongoose.Schema.Types.String,
            rows : mongoose.Schema.Types.Number,
            size : mongoose.Schema.Types.Number,
            order : mongoose.Schema.Types.Number,
            class : mongoose.Schema.Types.String,
            icon : mongoose.Schema.Types.String,
            deletable : mongoose.Schema.Types.Boolean,
            formatted : mongoose.Schema.Types.Boolean,
            dateCreated : {type : mongoose.Schema.Types.Date , default : Date.now()}
        },
        {collection : 'webdev.assignment.widget'});

    return WidgetSchema;
};
