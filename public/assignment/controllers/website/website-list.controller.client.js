/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",websiteListController);

    function websiteListController($routeParams,WebsiteService,$location){
        var vm = this;


        function init(){
            vm.developerId = $routeParams['uid'];
            vm.add = navWebsiteNew;
            vm.edit = navWebsiteEdit;
            vm.profile = navProfile;
            vm.pageList = navPages;
            vm.websites = WebsiteService.findWebsitesByUser(vm.developerId);
        }
        init();

        function navWebsiteNew(){
            $location.url('/user/' + vm.developerId + '/website/new');
        }

        function navWebsiteEdit(websiteId){
            $location.url('/user/' + vm.developerId + '/website/' + websiteId);
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }

        function navPages(websiteId){
            $location.url('/user/' + vm.developerId + '/website/' + websiteId + '/page');
        }
    }

})();
