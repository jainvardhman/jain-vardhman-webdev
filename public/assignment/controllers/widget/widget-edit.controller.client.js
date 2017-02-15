/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",widgetEditController);

    function widgetEditController($routeParams,WidgetService,$location){
        var vm = this;

        function init() {
            vm.developerId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.pageid = $routeParams['pid'];
            vm.widgetId = $routeParams['wgid'];
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageid);
            vm.updateWidget = updateWidget;
            vm.deleteWidget = deleteWidget;
            vm.getEditorTemplateUrl = getEditorTemplateUrl;
            vm.profile = navProfile;
            vm.widgetList = navWidgets;
            vm.widgetChooser = navWidgetChoose;
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(widgetType) {
            return 'views/widget/widget-'+widgetType+'-edit.view.client.html';
        }

        function updateWidget(widget){
            var newWidget = WidgetService.updateWidget(vm.widgetId,widget);
            if(newWidget == null)
                vm.error = "Widget could not be updated";
            else
                $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + '/widget');
        }


        function deleteWidget(){
            var status = WidgetService.deleteWidget(vm.widgetId);
            if(status.success === "false")
                vm.error = "Widget could not be deleted";
            else
                $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + '/widget');
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
