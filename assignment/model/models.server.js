/**
 * Created by Vardhman on 3/9/2017.
 */
module.exports = function(app) {

    var connectionString = "mongodb://localhost:27017/test";
    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require('mongoose');
    mongoose.createConnection(connectionString);

    db.on('error', console.error.bind(console, 'Error in mongodb connection'));

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel : userModel,
        websiteModel : websiteModel,
        pageModel : pageModel,
        widgetModel : widgetModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};