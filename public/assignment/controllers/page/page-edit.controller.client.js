/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("PageEditController",pageEditController);

    function pageEditController($routeParams,PageService,$location){
        var vm = this;
        vm.developerId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
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
                });
            PageService.findPageById(vm.pageId)
                .success(function(page){
                    vm.page = page;
                })
                .error(function(err){
                    vm.error = 'Page could not be loaded';
                });
        }
        init();

        function navPages(websiteId){
            $location.url('/user/' + vm.developerId + '/website/' + websiteId + '/page');
        }

        function navPageNew(){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/new');
        }

        function updatePage(page){
            PageService.updatePage(vm.pageId,page)
                .success(function(page){
                    $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page');
                })
                .error(function(err){
                    vm.error = "Page could not be updated";
                });
        }


        function deletePage(){
            PageService.deletePage(vm.pageId)
                .success(function(newWebsite){
                    $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page');
                })
                .error(function(err){
                    vm.error = "Page could not be deleted";
                });
        }

        function navPageEdit(pageId){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + pageId);
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }
    }

})();
