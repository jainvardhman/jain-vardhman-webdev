/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("PageNewController",pageNewController);

    function pageNewController($routeParams,PageService,$location){
        var vm = this;

        function init(){
            vm.developerId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.createPage = createPage;
            vm.edit = navPageEdit;
            vm.add = navPageNew;
            vm.profile = navProfile;
            vm.pageList = navPages;
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
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
            page._id = (new Date).getTime().toString();
            var newPage = PageService.createPage(vm.websiteId,page);
            if(newPage == null)
                vm.error = "Page could not be created";
            else
                $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page');
        }

        function navWebsiteEdit(pageId){
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + pageId);
        }

        function navProfile(){
            $location.url('/user/' + vm.developerId);
        }
    }

})();
