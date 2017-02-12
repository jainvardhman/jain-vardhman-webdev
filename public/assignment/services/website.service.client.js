/**
 * Created by Vardhman on 2/9/2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', websiteService);

    function websiteService(){
        websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId,website){
            var newWebsite = {"_id": website._id, "name": website.name,
                            "developerId": userId, "description": website.description};
            for(var wbs in websites){
                var wbe = websites[wbs];
                if(wbe._id === newWebsite._id)
                    return null;
            }
            websites.push(newWebsite);
            return angular.copy(newWebsite);
        }

        function findWebsitesByUser(userId){
            var retWebsites = [];
            for(wbs in websites){
                var website = websites[wbs];
                if(website.developerId === userId){
                    retWebsites.push(angular.copy(website));
                }
            }
            return retWebsites;
        }

        function findWebsiteById(websiteId){
            for(wbs in websites){
                var website = websites[wbs];
                if(website._id === websiteId){
                    return angular.copy(website);
                }
            }
            return null;
        }

        function updateWebsite(websiteId,newWebsite){
            for(wbs in websites){
                var website = websites[wbs];
                if(website._id === websiteId){
                    website.name = newWebsite.name;
                    website.description = newWebsite.description;
                    return angular.copy(website);
                }
            }
            return null;
        }

        function deleteWebsite(websiteId){
            var wIndex = -1;
            for(wbs in websites){
                var website = websites[wbs];
                if(website._id === websiteId){
                    wIndex = wbs;
                    break;
                }
            }
            if(wIndex != -1){
                websites.splice(wIndex,1);
                return {success : "true"};
            }
            return {success : "false"};
        }
    }
})();