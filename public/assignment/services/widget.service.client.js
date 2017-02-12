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

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId,widget){
            getNewWidgetByWidgetType(pageId,widget)
            var newWidget = {"_id": widget._id, "widgetType": widget.widgetType,
                "pageId": pageId, "text": widget.text};
            widgets.push(newWidget);
        }

        function getNewWidgetByWidgetType(pageId,widget){
            var newWidget;
            if(widget.widgetType === "HEADER"){
                newWidget = {"_id": widget._id, "widgetType": widget.widgetType,
                    "pageId": pageId, "text": widget.text, "size": widget.size};
            } else if(widget.widgetType === "IMAGE"){
                newWidget = {"_id": widget._id, "widgetType": widget.widgetType,
                    "pageId": pageId, "width": widget.width, "url": widget.url};

            } else if(widget.widgetType === "HTML"){
                newWidget = {"_id": widget._id, "widgetType": widget.widgetType,
                    "pageId": pageId, "text": widget.text};

            } else if(widget.widgetType === "YOUTUBE"){
                newWidget = {"_id": widget._id, "widgetType": widget.widgetType,
                    "pageId": pageId, "width": widget.width, "url": widget.url};

            } else {
                newWidget = {"_id": widget._id, "widgetType": widget.widgetType,
                    "pageId": pageId, "text": widget.text};
            }

            return newWidget;
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
                    widget = getNewWidgetByWidgetType(widget.pageId,newWidget);
                    return angular.copy(widget);
                }
            }
            return null;
        }

        function deleteWidget(widgetId){
            for(wgs in widgets){
                var widget = widgets[wgs];
                if(widget._id === widgetId){
                    widgets.pop(wgs);
                    return {success : "true"};
                }
            }
            return {success : "false"};
        }
    }
})();