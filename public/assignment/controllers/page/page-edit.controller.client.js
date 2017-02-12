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
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function navPages(websiteId){
            $location.url('/user/' + vm.developerId + '/website/' + websiteId + '/page');
        }

        function navPageNew(){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/new');
        }

        function updatePage(page){
            var newPage = PageService.updatePage(vm.pageId,page);
            if(newPage == null)
                vm.error = "Page could not be updated";
            else
                $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page');
        }


        function deletePage(){
            var status = PageService.deletePage(vm.pageId);
            if(status.success === "false")
                vm.error = "Page could not be deleted";
            else
                $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page');
        }

        function navPageEdit(pageId){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + pageId);
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }
    }

})();
