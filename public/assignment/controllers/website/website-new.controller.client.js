/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController",websiteNewController);

    function websiteNewController($routeParams,WebsiteService,$location){
        var vm = this;

        function init(){
            vm.developerId = $routeParams['uid'];
            vm.createWebsite = createWebsite;
            vm.edit = navWebsiteEdit;
            vm.add = navWebsiteNew;
            vm.profile = navProfile;
            vm.websiteList = navWebsites;
            vm.pageList = navPages;
            vm.websites = WebsiteService.findWebsitesByUser(vm.developerId);
        }
        init();

        function navPages(websiteId){
            $location.url('/user/' + vm.developerId + '/website/' + websiteId + '/page');
        }

        function navWebsites(){
            $location.url('/user/' + vm.developerId + '/website');
        }

        function navWebsiteNew(){
            $location.url('/user/' + vm.developerId + '/website/new');
        }


        function createWebsite(website){
            website._id = (new Date).getTime().toString();
            var newWebsite = WebsiteService.createWebsite(vm.developerId,website);
            if(newWebsite == null)
                vm.error = "Website could not be created";
            else
                $location.url('/user/' + vm.developerId + '/website');
        }

        function navWebsiteEdit(webisteId){
            $location.url('/user/' + vm.developerId + '/website/' + webisteId);
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }
    }

})();
