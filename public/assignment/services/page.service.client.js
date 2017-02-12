/**
 * Created by Vardhman on 2/9/2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory('PageService', pageService);

    function pageService(){
        pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId,page){
            var newPage = {"_id": page._id, "name": page.name,
                "websiteId": websiteId, "description": page.description};

            for(var pgs in pages){
                var pge = pages[pgs];
                if(pge._id === newPage._id)
                    return null;
            }
            pages.push(newPage);
            return angular.copy(newPage);
        }

        function findPagesByWebsiteId(websiteId){
            var retPages = [];
            for(var pgs in pages){
                var page = pages[pgs];
                if(page.websiteId === websiteId){
                    retPages.push(angular.copy(page));
                }
            }
            return retPages;
        }

        function findPageById(pageId){
            for(var pgs in pages){
                var page = pages[pgs];
                if(page._id === pageId){
                    return angular.copy(page);
                }
            }
            return null;
        }

        function updatePage(pageId,newPage){
            for(var pgs in pages){
                var page = pages[pgs];
                if(page._id === pageId){
                    page.name = newPage.name;
                    page.description = newPage.description;
                    return angular.copy(page);
                }
            }
            return null;
        }

        function deletePage(pageId){
            var wIndex = -1;
            for(pgs in pages){
                var page = pages[pgs];
                if(page._id === pageId){
                    pIndex = pgs;
                    break;
                }
            }
            if(pIndex != -1){
                pages.splice(pIndex,1);
                return {success : "true"};
            }
            return {success : "false"};
        }
    }
})();