/**
 * Created by Vardhman on 2/9/2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory('WidgetService', widgetService);

    function widgetService(){
        widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        widgetTypes = [
            {"type":"HEADER", "text": "Header"},
            {"type":"LABEL", "text": "Label"},
            {"type":"HTML", "text": "HTML"},
            {"type":"TEXT", "text": "Text Input"},
            {"type":"LINK", "text": "Link"},
            {"type":"BUTTON", "text": "Button"},
            {"type":"IMAGE", "text": "Image"},
            {"type":"YOUTUBE", "text": "YouTube"},
            {"type":"TABLE", "text": "Data Table"},
            {"type":"REPEATER", "text": "Repeater"}
        ];



        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getAllWidgetTypes" : getAllWidgetTypes
        };
        return api;

        function createWidget(pageId,widget){
            var newWidget = {"_id": widget._id, "widgetType": widget.widgetType,
                "pageId": pageId};
            widgets.push(newWidget);
            return angular.copy(newWidget);
        }

        function getNewWidgetByWidgetType(pageId,widgetOld,widgetNew){
            if(widgetOld.widgetType === "HEADER"){
                widgetOld.text = widgetNew.text;
                widgetOld.size = widgetNew.size;
            } else if(widgetOld.widgetType === "IMAGE"){
                widgetOld.width = widgetNew.width;
                widgetOld.url = widgetNew.url;
            } else if(widgetOld.widgetType === "HTML"){
                widgetOld.text = widgetNew.text;

            } else if(widgetOld.widgetType === "YOUTUBE"){
                widgetOld.width = widgetNew.width;
                widgetOld.url = widgetNew.url;

            } else {
                widgetOld.text = widgetNew.text;
            }
        }

        function getAllWidgetTypes(){
            var retWidgetTypes = [];
            for(wgs in widgetTypes){
                var widgetType = widgetTypes[wgs];
                retWidgetTypes.push(angular.copy(widgetType));
            }
            return retWidgetTypes;
        }

        function findWidgetsByPageId(pageId){
            var retWidgets = [];
            for(wgs in widgets){
                var widget = widgets[wgs];
                if(widget.pageId === pageId){
                    retWidgets.push(angular.copy(widget));
                }
            }
            return retWidgets;
        }

        function findWidgetById(widgetId){
            for(wgs in widgets){
                var widget = widgets[wgs];
                if(widget._id === widgetId){
                    return angular.copy(widget);
                }
            }
            return null;
        }

        function updateWidget(widgetId,newWidget){
            for(wgs in widgets){
                var widget = widgets[wgs];
                if(widget._id === widgetId){
                    newWidget._id = widget._id;
                    newWidget.pageId = widget.pageId;
                    newWidget.widgetType = widget.widgetType;
                    getNewWidgetByWidgetType(widget.pageId,widget,newWidget);
                    return angular.copy(widget);
                }
            }
            return null;
        }

        function deleteWidget(widgetId){
            var wgIndex = -1;
            for(wgts in widgets){
                var widget = widgets[wgts];
                if(widget._id === widgetId){
                    wgIndex = wgts;
                    break;
                }
            }
            if(wgIndex != -1){
                widgets.splice(wgIndex,1);
                return {success : "true"};
            }
            return {success : "false"};
        }
    }
})();