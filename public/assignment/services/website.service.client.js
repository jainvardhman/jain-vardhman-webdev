/**
 * Created by Vardhman on 2/9/2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', websiteService);

    function websiteService($http){
        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId,website){
            return $http.post('/api/user/' + userId + '/website',website);
        }

        function findWebsitesByUser(userId){
            return $http.get('/api/user/' + userId + '/website');
        }

        function findWebsiteById(websiteId){
            return $http.get('/api/website/' + websiteId);
        }

        function updateWebsite(websiteId,newWebsite){
            return $http.put('/api/website/' + websiteId,newWebsite);
        }

        function deleteWebsite(websiteId){
            return $http.delete('/api/website/' + websiteId,newWebsite);
        }
    }
})();