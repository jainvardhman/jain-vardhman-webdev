/**
 * Created by Vardhman on 2/25/2017.
 */
module.exports = function(app) {
    var multer = require('multer');
    var upload = multer({ dest : __dirname + '/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.get("/api/widgetTypes", getAllWidgetTypes);
    app.put("/api/page/:pageId/widget", updateWidgetOrder);
    app.post("/api/upload",upload.single('file'), uploadImage);

    widgets = {"321" : [{ "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}]};

    widgetTypes = [
        {"type":"HEADER", "text": "Header"},
        {"type":"LABEL", "text": "Label"},
        {"type":"HTML", "text": "HTML"},
        {"type":"TEXT", "text": "Text Input"},
        {"type":"LINK", "text": "Link"},
        {"type":"BUTTON", "text": "Button"},
        {"type":"IMAGE", "text": "Image"},
        {"type":"YOUTUBE", "text": "YouTube"},
        {"type":"TABLE", "text": "Data Table"},
        {"type":"REPEATER", "text": "Repeater"}
    ];

    function createWidget(req,res){
        var widget = req.body;
        var pageId = req.params['pageId'];
        var pageArray = widgets[pageId];
        if(pageArray === null)
            pageArray = [];
        var newWidget = {"_id": widget._id, "widgetType": widget.widgetType,
            "pageId": pageId};
        pageArray.push(newWidget);
        widgets[pageId] = pageArray;
        res.status(200).json(newWidget);
    }

    function getNewWidgetByWidgetType(pageId,widgetOld,widgetNew){
        if(widgetOld.widgetType === "HEADER"){
            widgetOld.text = widgetNew.text;
            widgetOld.size = widgetNew.size;
        } else if(widgetOld.widgetType === "IMAGE"){
            widgetOld.width = widgetNew.width;
            widgetOld.url = widgetNew.url;
        } else if(widgetOld.widgetType === "HTML"){
            widgetOld.text = widgetNew.text;

        } else if(widgetOld.widgetType === "YOUTUBE"){
            widgetOld.width = widgetNew.width;
            widgetOld.url = widgetNew.url;

        } else {
            widgetOld.text = widgetNew.text;
        }
    }

    function getAllWidgetTypes(req,res){
        var retWidgetTypes = [];
        for(wgs in widgetTypes){
            var widgetType = widgetTypes[wgs];
            retWidgetTypes.push(widgetType);
        }
        res.status(200).send(retWidgetTypes);
    }

    function findAllWidgetsForPage(req,res){
        var pageId = req.params['pageId'];
        var retWidgets = widgets[pageId];

        if(retWidgets === null)
            retWidgets = [];

        if(retWidgets.length > 0){
            res.status(200).json(retWidgets);
            return;
        }
        res.status(404).send('Page not found for id: ' + pageId);
    }

    function findWidgetById(req,res){
        var widgetId = req.params['widgetId'];
        for(var pageId in widgets){
            var widgetArray = widgets[pageId];
            for(wgs in widgetArray){
                var widget = widgetArray[wgs];
                if(widget._id === widgetId){
                    res.status(200).json(widget);
                    return;
                }
            }
        }
        res.status(404).send('Widget not found for id: ' + widgetId);
    }

    function updateWidget(req,res){
        var newWidget = req.body;
        var widgetId = req.params['widgetId'];
        var pageId = newWidget.pageId;
        var widgetArray = widgets[pageId];
        for(wgs in widgetArray){
            var widget = widgetArray[wgs];
            if(widget._id === widgetId){
                newWidget._id = widget._id;
                newWidget.pageId = widget.pageId;
                newWidget.widgetType = widget.widgetType;
                getNewWidgetByWidgetType(widget.pageId,widget,newWidget);
                res.status(200).json(widget);
                return;
            }
        }
        res.status(404).send('Widget not found for id: ' + widgetId);
    }

    function deleteWidget(req,res){
        var widgetId = req.params['widgetId'];
        for(var pageId in widgets) {
            var wgIndex = -1;
            var widgetArray = widgets[pageId];
            for(wgts in widgetArray){
                var widget = widgetArray[wgts];
                if(widget._id === widgetId){
                    widgetArray.splice(wgts,1);
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.status(404).send('Widget not found for id: ' + widgetId);
    }

    function updateWidgetOrder(req,res){
        var startIndex = req.query['startIndex'];
        var endIndex = req.query['endIndex'];
        var pageId = req.params['pageId'];
        var widgetArray = widgets[pageId];
        if(widgetArray === null)
            widgetArray = [];
        if(widgetArray.length > 0){
            var widget = widgetArray[startIndex];
            widgetArray.splice(startIndex,1);
            widgetArray.splice(endIndex,0,widget);
            res.status(200).send('Widget order updated for page: ' + pageId);
        }
        else{
            res.status(404).send('No widgets for the page: ' + pageId);
        }
    }

    function uploadImage(req,res){
        var myFile = req.file;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var origin = req.headers.origin;
        for(var pageId in widgets) {
            var widgetArray = widgets[pageId];
            for(wgts in widgetArray){
                var widget = widgetArray[wgts];
                if(widget._id === widgetId){
                    widget.width = width;
                    widget.url = origin + "/uploads/" +  myFile.filename;
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.status(400).send('File could not be uploaded');
    }
};
