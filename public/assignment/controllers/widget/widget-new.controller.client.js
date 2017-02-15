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
        vm.widgetTypes = WidgetService.getAllWidgetTypes();
        vm.createWidget = createWidget;
        vm.widgetList = navWidgets;
        vm.widgetNew = navWidgetNew;
        vm.edit = navWidgetEdit;
        vm.profile = navProfile;

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
            var newWidget = WidgetService.createWidget(vm.pageid,widget);
            if(newWidget == null){
                vm.error = "Widget could not be created";
            }

            else{
                navWidgetEdit(widget._id);
            }
        }

        function navWidgetEdit(widgetId){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + "/widget/" + widgetId);
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }

        /*vm.add = navPageNew;
         vm.edit = navPageEdit;
         vm.profile = navProfile;
         vm.websiteList = navWebsites;
         vm.widgets = navWidgets;

         function navWebsites(){
         $location.url('/user/' + vm.developerId + '/website');
         }

         function navPageNew(){
         $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/new');
         }

         function navPageEdit(pageId){
         $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + pageId);
         }

         function navProfile(){
         $location.url('/user/' + vm.developerId);
         }

         function navWidgets(pageId){
         $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + pageId + '/widget');
         }*/
    }

})();
