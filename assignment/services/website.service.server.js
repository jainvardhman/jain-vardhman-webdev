/**
 * Created by Vardhman on 2/25/2017.
 */
module.exports = function(app,model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    /*websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];*/

    function createWebsite(req,res){
        var website = req.body;
        var userId = req.params['userId'];
        var newWebsite = {"name": website.name,
            "_user": userId, "description": website.description};
        model.websiteModel.createWebsiteForUser(userId,newWebsite)
            .then(function(website){
                    res.status(200).json(website);
                },
                function(err){
                    res.sendStatus(500).send(err);
                });
    }

    function findAllWebsitesForUser(req,res){
        var userId = req.params['userId'];
        model.websiteModel.findAllWebsitesForUser(userId)
            .then(function(websites){
                    res.status(200).json(websites);
                },
                function(err){
                    res.status(404).send('User not found for id: ' + userId);
                });
    }

    function findWebsiteById(req,res){
        var websiteId = req.params['websiteId'];
        model.websiteModel.findWebsiteById(websiteId)
            .then(function(website){
                    res.status(200).json(website);
                },
                function(err){
                    res.status(404).send('Website not found for id: ' + websiteId);
                });
    }

    function updateWebsite(req,res){
        var newWebsite = req.body;
        var websiteId = req.params['websiteId'];
        model.websiteModel.updateWebsite(websiteId,newWebsite)
            .then(function(website){
                    res.status(200).json(website);
                },
                function(err){
                    res.status(404).send('Website not found for id: ' + websiteId);
                });
    }

    function deleteWebsite(req,res){
        var websiteId = req.params['websiteId'];
        model.websiteModel.deleteWebsite(websiteId)
            .then(function(website){
                    res.status(200).json(website);
                },
                function(err){
                    res.status(404).send('Website not found for id: ' + websiteId);
                });
    }
};
