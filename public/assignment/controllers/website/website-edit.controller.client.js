/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController",websiteEditController);

    function websiteEditController($routeParams,WebsiteService,$location){
        var vm = this;


        function init(){
            vm.developerId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.updateWebsite = updateWebsite;
            vm.deleteWebsite = deleteWebsite;
            vm.edit = navWebsiteEdit;
            vm.add = navWebsiteNew;
            vm.profile = navProfile;
            vm.websiteList = navWebsites;
            vm.pageList = navPages;
            WebsiteService.findWebsitesByUser(vm.developerId)
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(err){
                    vm.error = 'Error while loading websites';
                });
            WebsiteService.findWebsiteById(vm.websiteId)
                .success(function(website){
                    vm.website = website;
                })
                .error(function(err){
                    vm.error = 'Error while loading website';
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

        function updateWebsite(website){
            var promise = WebsiteService.updateWebsite(vm.websiteId,website);
            promise
                .success(function(newWebsite){
                    $location.url('/user/' + vm.developerId + '/website');
                })
                .error(function(err){
                    vm.error = "Website could not be updated";
                });
        }


        function deleteWebsite(){
            var promise = WebsiteService.deleteWebsite(vm.websiteId);
            promise
                .success(function(success){
                    $location.url('/user/' + vm.developerId + '/website');
                })
                .error(function(err){
                    vm.error = "Website could not be deleted";
                });
        }

        function navWebsiteEdit(websiteId){
            $location.url('/user/' + vm.developerId + '/website/' + websiteId);
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }
    }

})();
