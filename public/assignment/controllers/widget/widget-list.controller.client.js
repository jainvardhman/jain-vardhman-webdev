/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("WidgetListController",widgetListController);

    function widgetListController($sce,$routeParams,WidgetService,$location){
        var vm = this;
        vm.developerId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageid = $routeParams['pid'];
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pageid);
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.profile = navProfile;
        vm.pageList = navPages;
        vm.widgetNew = navWidgetNew;
        vm.edit = navWidgetEdit;
        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }

        function navPages(){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page');
        }

        function navWidgetNew(){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + '/widget/new');
        }

        function navWidgetEdit(widgetId){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + "/widget/" + widgetId);
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
