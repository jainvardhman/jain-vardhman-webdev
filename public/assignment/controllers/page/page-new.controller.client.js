/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("PageNewController",pageNewController);

    function pageNewController($routeParams,PageService,$location){
        var vm = this;
        vm.developerId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.createPage = createPage;
        vm.edit = navPageEdit;
        vm.add = navPageNew;
        vm.profile = navProfile;
        vm.pageList = navPages;

        function init(){
            PageService.findPagesByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(err){
                    vm.error = 'Pages could not be loaded';
                });;
        }
        init();

        function navPageNew(){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/new');
        }

        function navPageEdit(pgid){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + pgid);
        }

        function navPages(websiteId){
            $location.url('/user/' + vm.developerId + '/website/' + websiteId + '/page');
        }

        function createPage(page){
            //page._id = (new Date).getTime().toString();
            PageService.createPage(vm.websiteId,page)
                .success(function(newWebsite){
                    $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page');
                })
                .error(function(err){
                    vm.error = "Page could not be created";
                });
        }

        function navWebsiteEdit(pageId){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + pageId);
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }
    }

})();
