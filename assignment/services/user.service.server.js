/**
 * Created by Vardhman on 2/25/2017.
 */

module.exports = function(app,model){
    app.get("/api/user", findUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    /*var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , email: "wonderland.a@gmail.com" },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley" , email: "marley.b@gmail.com" },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia" , email: "garcia.c@gmail.com" },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "annunzi.j@gmail.com" }
    ];*/


    //var userModel = model.userModel;

    function createUser(req,res){
        //var userModel = require("../model/user/user.model.server");
        var newUser = req.body;
        model.userModel.createUser(newUser)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.sendStatus(500).send(err);
                });
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {{
            findUserByCredentials(req, res);
            return;
        }

        } else if(username) {
            findUserByUsername(req, res);
            return;
        }
    }

    function findUserByUsername(req,res){
        var uName = req.query['username'];
        model.userModel.findUserByUsername(uName)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.sendStatus(404).send('User not found for username: ' + username);
                });
        res.status(404)
    }

    function findUserByCredentials(req,res){
        var uName = req.query['username'];
        var uPwd = req.query['password'];
        model.userModel.findUserByCredentials(uName,uPwd)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.status(404).send('User not found for username: ' + uName + ' and password: ' + uPwd);
                });
    }

    function findUserById(req,res){
        var uId = req.params['userId'];
        model.userModel.findUserById(uId)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.status(404).send('User not found for id: ' + uId);
                });
    }

    function updateUser(req,res){
        var uId = req.params['userId'];
        var newUser = req.body;
        model.userModel.updateUser(uId,newUser)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.status(404).send('User not found for id: ' + uId);
                });
    }

    function deleteUser(req,res){
        var uId = req.params['userId'];
        model.userModel.deleteUser(uId)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.status(404).send('User not found for id: ' + uId);
                });
    }

};
