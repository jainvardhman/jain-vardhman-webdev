/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",widgetEditController);

    function widgetEditController($routeParams,WidgetService,$location,$http){
        var vm = this;
        vm.developerId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageid = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.profile = navProfile;
        vm.widgetList = navWidgets;
        vm.widgetChooser = navWidgetChoose;
        vm.upload = fileUpload;

        function init() {
            WidgetService.findWidgetsByPageId(vm.pageid)
                .success(function(widgets){
                    vm.widgets = widgets;
                })
                .error(function(err){
                    vm.error = 'Could not load widgets';
                });
            WidgetService.findWidgetById(vm.widgetId)
                .success(function(widget){
                    vm.widget = widget;
                })
                .error(function(err){
                    vm.error = 'Could not load widget';
                });
        }
        init();

        function getEditorTemplateUrl(widgetType) {
            return 'views/widget/widget-'+widgetType+'-edit.view.client.html';
        }

        function updateWidget(widget){
            WidgetService.updateWidget(vm.widgetId,widget)
                .success(function(widget){
                    $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + '/widget');
                })
                .error(function(err){
                    vm.error = "Widget could not be updated";
                });
        }


        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId)
                .success(function(widget){
                    $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + '/widget');
                })
                .error(function(err){
                    vm.error = "Widget could not be deleted";
                });
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }

        function navWidgets(){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + '/widget');
        }

        function navWidgetChoose(){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + '/widget/new');
        }

        function fileUpload(){
            var widget = vm.widget;
            var file = vm.file;
            widget['widgetId'] = vm.widgetId;

            WidgetService.fileUpload(widget,file)
                .success(function(widget){
                    navWidgets();
                })
                .error(function(err){
                    vm.error = "File could not be uploaded";
                });
        }
    }

})();
