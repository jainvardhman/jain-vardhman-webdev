/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("PageListController",pageListController);

    function pageListController($routeParams,PageService,$location){
        var vm = this;


        function init(){
            vm.developerId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            PageService.findPagesByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(err){
                    vm.error = 'Pages could not be loaded';
                });

            vm.add = navPageNew;
            vm.edit = navPageEdit;
            vm.profile = navProfile;
            vm.websiteList = navWebsites;
            vm.widgets = navWidgets;
        }
        init();

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
