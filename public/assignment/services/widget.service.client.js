/**
 * Created by Vardhman on 2/9/2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory('WidgetService', widgetService);

    function widgetService($http){
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getAllWidgetTypes" : getAllWidgetTypes,
            "fileUpload" : fileUpload,
            "updateWidgetsOrder" : updateWidgetsOrder
        };
        return api;

        function createWidget(pageId,widget){
            return $http.post('/api/page/' + pageId + '/widget',widget);
        }

        function getAllWidgetTypes(){
            return $http.get('/api/widgetTypes');
        }

        function findWidgetsByPageId(pageId){
            return $http.get('/api/page/' + pageId + '/widget');
        }

        function findWidgetById(widgetId){
            return $http.get('/api/widget/' + widgetId);
        }

        function updateWidget(widgetId,newWidget){
            return $http.put('/api/widget/' + widgetId,newWidget);
        }

        function deleteWidget(widgetId){
            return $http.delete('/api/widget/' + widgetId);
        }

        function fileUpload(widget,file){
            var fd = new FormData();
            fd.append('file', file);
            fd.append('widgetId', widget['widgetId']);
            fd.append('width', widget['width']);
            fd.append('url', widget['url']);
            return $http.post("/api/upload",fd,{
                transformRequest: angular.identity,
                headers : {'Content-Type' : undefined}
            });
        }

        function updateWidgetsOrder(pageId,startIndex,endIndex){
            return $http.put('/api/page/' + pageId + '/widget?startIndex=' + startIndex + '&endIndex=' + endIndex);
        }
    }
})();