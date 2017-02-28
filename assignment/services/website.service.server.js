/**
 * Created by Vardhman on 2/25/2017.
 */
module.exports = function(app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function createWebsite(req,res){
        var website = req.body;
        var userId = req.params['userId'];
        var newWebsite = {"_id": website._id, "name": website.name,
            "developerId": userId, "description": website.description};
        for(var wbs in websites){
            var wbe = websites[wbs];
            if(wbe._id === newWebsite._id){
                res.status(409).send('website id ' + wbe._id + ' already exists');
                return;
            }
        }
        websites.push(newWebsite);
        res.status(200).json(newWebsite);
    }

    function findAllWebsitesForUser(req,res){
        var userId = req.params['userId'];
        var retWebsites = [];
        for(wbs in websites){
            var website = websites[wbs];
            if(website.developerId === userId){
                retWebsites.push(website);
            }
        }
        if(retWebsites.length > 0){
            res.status(200).json(retWebsites);
            return;
        }

        res.status(404).send('User not found for id: ' + userId);
    }

    function findWebsiteById(req,res){
        var websiteId = req.params['websiteId'];
        for(wbs in websites){
            var website = websites[wbs];
            if(website._id === websiteId){
                res.status(200).json(website);
                return;
            }
        }
        res.status(404).send('Website not found for id: ' + websiteId);
    }

    function updateWebsite(req,res){
        var newWebsite = req.body;
        var websiteId = req.params['websiteId'];
        for(wbs in websites){
            var website = websites[wbs];
            if(website._id === websiteId){
                website.name = newWebsite.name;
                website.description = newWebsite.description;
                res.status(200).json(website);
                return;
            }
        }
        res.status(404).send('Website not found for id: ' + websiteId);
    }

    function deleteWebsite(req,res){
        var websiteId = req.params['websiteId'];
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
            res.sendStatus(200);
            return;
        }
        res.status(404).send('Website not found for id: ' + websiteId);
    }
};
