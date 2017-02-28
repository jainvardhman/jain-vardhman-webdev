/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("WidgetNewController",widgetNewController);

    function widgetNewController($routeParams,WidgetService,$location){
        var vm = this;
        vm.developerId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageid = $routeParams['pid'];
        vm.widgetTypes = [];
        vm.createWidget = createWidget;
        vm.widgetList = navWidgets;
        vm.widgetNew = navWidgetNew;
        vm.edit = navWidgetEdit;
        vm.profile = navProfile;

        function init(){
            var promise = WidgetService.getAllWidgetTypes();
                promise.success(function(widgetTypes){
                    vm.widgetTypes = widgetTypes;
                })
                .error(function(err){
                    vm.error = 'Widget types could not be loaded';
                });
        }

        init();

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }

        function navWidgets(){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + '/widget');
        }

        function navWidgetNew(){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + '/widget/new');
        }

        function createWidget(widgetType){
            var widget = {};
            widget._id = (new Date).getTime().toString();
            widget.widgetType = widgetType;
            widget.pageId = vm.pageid;
            WidgetService.createWidget(vm.pageid,widget)
                .success(function(widget){
                    navWidgetEdit(widget._id);
                })
                .error(function(err){
                    vm.error = "Widget could not be created";
                });
        }

        function navWidgetEdit(widgetId){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + "/widget/" + widgetId);
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }
    }

})();
