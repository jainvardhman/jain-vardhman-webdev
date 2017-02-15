/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("PageListController",pageListController);

    function pageListController($routeParams,PageService,$location){
        var vm = this;
        vm.developerId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        vm.add = navPageNew;
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
        }
    }

})();
