/**
 * Created by Vardhman on 3/9/2017.
 */


module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel  = mongoose.model("WidgetModel", WidgetSchema);
    var q = require("q");

    var api = {
        "createWidget": createWidget,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "updateWidget": updateWidget,
        "deleteWidget": deleteWidget,
        "reorderWidget" : reorderWidget,
        "setModel" : setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId,widget){
        var deferred = q.defer();
        WidgetModel.create(widget,function(err,widget) {
            if (err) {
                deferred.reject(err);
            } else {
                model.pageModel.findPageById(pageId)
                    .then(function (page) {
                        page.widgets.push(widget);
                        page.save();
                        deferred.resolve(widget);
                    }, function (err) {
                        deferred.reject(err);
                    });
            }
        })
        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId){
        var deferred = q.defer();
        WidgetModel.find({"_page" : pageId},function(err,widgets){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(widgets);
            }
        });
        return deferred.promise;
    }

    function findWidgetById(widgetId){
        var deferred = q.defer();
        WidgetModel.findById(widgetId,function(err,widget){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(widget);
            }
        });
        return deferred.promise;
    }

    function updateWidget(widgetId,newWidget){
        var deferred = q.defer();
        WidgetModel.update({"_id" : widgetId},
            {$set : newWidget}, {multi : true}, function(err,widget){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function deleteWidget(widgetId){
        var deferred = q.defer();
        //UserModel.update({"_id" : website["_user"]}, {$pull : {"websites" : websiteId}},
        //    function(err,user){
        WidgetModel.remove({"_id" : widgetId},
            function(err,widget){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(widget);
                }
            });
        //deferred.resolve(website);
//           });

        return deferred.promise;
    }

    function reorderWidget(pageId,start,end){
        var deferred = q.defer();
/*        var rangeQuery;
        if(start < end)
            rangeQuery = {$gte : start , $lte : end};
        else
            rangeQuery = {$lte : start , $gte : end};*/

        findAllWidgetsForPage(pageId).//, "order" : rangeQuery}).
            then(function(widgets){
                var multipler = 1;
                for(wi in widgets){
                    if((widgets[wi]["order"] < start && widgets[wi]["order"] < end)
                        || (widgets[wi]["order"] > start && widgets[wi]["order"] > end)){
                        continue;
                    }
                    else {
                        if (widgets[wi]["order"] == start) {
                            widgets[wi]["order"] = end;
                        } else {
                            if (start < end) {
                                multiplier = -1;
                            } else {
                                multiplier = 1;
                            }
                            widgets[wi]["order"] = widgets[wi]["order"] + multiplier;
                        }
                        widgets[wi].save();
                    }
                }
                deferred.resolve(widgets);
                },function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    }
};
