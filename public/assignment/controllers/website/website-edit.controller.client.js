/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController",websiteEditController);

    function websiteEditController($routeParams,WebsiteService,$location){
        var vm = this;
        vm.developerId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.edit = navWebsiteEdit;
        vm.add = navWebsiteNew;
        vm.profile = navProfile;
        vm.websiteList = navWebsites;
        vm.pageList = navPages;

        function init(){
            vm.websites = WebsiteService.findWebsitesByUser(vm.developerId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
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

        function updateWebsite(website){
            var newWebsite = WebsiteService.updateWebsite(vm.websiteId,website);
            if(newWebsite == null)
                vm.error = "Website could not be updated";
            else
                $location.url('/user/' + vm.developerId + '/website');
        }


        function deleteWebsite(){
            var status = WebsiteService.deleteWebsite(vm.websiteId);
            if(status.success === "false")
                vm.error = "Website could not be deleted";
            else
                $location.url('/user/' + vm.developerId + '/website');
        }

        function navWebsiteEdit(websiteId){
            $location.url('/user/' + vm.developerId + '/website/' + websiteId);
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }
    }

})();
