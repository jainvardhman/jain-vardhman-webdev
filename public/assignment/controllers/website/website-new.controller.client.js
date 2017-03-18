/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController",websiteNewController);

    function websiteNewController($routeParams,WebsiteService,$location){
        var vm = this;
        vm.developerId = $routeParams['uid'];
        vm.createWebsite = createWebsite;
        vm.edit = navWebsiteEdit;
        vm.add = navWebsiteNew;
        vm.profile = navProfile;
        vm.websiteList = navWebsites;
        vm.pageList = navPages;

        function init(){
            WebsiteService.findWebsitesByUser(vm.developerId)
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(err){
                   vm.error = 'Error while loading websites';
                });
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
            //website._id = (new Date).getTime().toString();
            WebsiteService.createWebsite(vm.developerId,website)
                .success(function(newWebsite){
                    $location.url('/user/' + vm.developerId + '/website');
                })
                .error(function(err){
                    vm.error = "Website could not be created";
                });
        }

        function navWebsiteEdit(webisteId){
            $location.url('/user/' + vm.developerId + '/website/' + webisteId);
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }
    }

})();
