/**
 * Created by Vardhman on 2/25/2017.
 */

module.exports = function(app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req,res){
        var page = req.body;
        var websiteId = req.params['websiteId'];
        var userId = req.params['userId'];
        var newPage = {"_id": page._id, "name": page.name,
            "websiteId": websiteId, "description": page.description};

        for(var pgs in pages){
            var pge = pages[pgs];
            if(pge._id === newPage._id){
                res.status(409).send('page id ' + page._id + ' already exists');
                return;
            }
        }
        pages.push(newPage);
        res.status(200).json(newPage);
    }

    function findAllPagesForWebsite(req,res){
        var websiteId = req.params['websiteId'];
        var userId = req.params['userId'];
        var retPages = [];
        for(var pgs in pages){
            var page = pages[pgs];
            if(page.websiteId === websiteId){
                retPages.push(page);
            }
        }
        if(retPages.length > 0){
            res.status(200).json(retPages);
            return;
        }
        res.status(404).send('Website not found for id: ' + websiteId);
    }

    function findPageById(req,res){
        var pageId = req.params['pageId'];
        for(var pgs in pages){
            var page = pages[pgs];
            if(page._id === pageId){
                res.status(200).json(page);
                return;
            }
        }
        res.status(404).send('Page not found for id: ' + pageId);
    }

    function updatePage(req,res){
        var newPage = req.body;
        var pageId = req.params['pageId'];
        for(var pgs in pages){
            var page = pages[pgs];
            if(page._id === pageId){
                page.name = newPage.name;
                page.description = newPage.description;
                res.status(200).json(page);
                return;
            }
        }
        res.status(404).send('Page not found for id: ' + pageId);
    }

    function deletePage(req,res){
        var pageId = req.params['pageId'];
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
            res.sendStatus(200);
            return;
        }
        res.status(404).send('Page not found for id: ' + pageId);
    }

};
