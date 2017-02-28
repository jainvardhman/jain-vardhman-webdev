/**
 * Created by Vardhman on 2/25/2017.
 */

module.exports = function(app){
    app.get("/api/user", findUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , email: "wonderland.a@gmail.com" },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley" , email: "marley.b@gmail.com" },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia" , email: "garcia.c@gmail.com" },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "annunzi.j@gmail.com" }
    ];

    function createUser(req,res){
        var newUser = req.body;
        if(newUser.password != newUser.verify)
            return null;
        for(usr in users){
            var user = users[usr];
            if(user.username === newUser.username || user._id === newUser._id){
                res.sendStatus(404);
                return;
            }
        }
        users.push(newUser);
        res.status(200).json(newUser);
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
        for(var usr in users){
            var user = users[usr];
            if(user.username === uName){
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send('User not found for username: ' + username);
    }

    function findUserByCredentials(req,res){
        var uName = req.query['username'];
        var uPwd = req.query['password'];
        for(var usr in users){
            var user = users[usr];
            if(user.username === uName && user.password === uPwd){
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send('User not found for username: ' + uName + ' and password: ' + uPwd);
    }

    function findUserById(req,res){
        var uId = req.params['userId'];
        for(var usr in users){
            var user = users[usr];
            if(user._id === uId){
                res.status(200).json(user);
                return;
            }
        }
        res.status(404).send('User not found for id: ' + uId);
    }

    function updateUser(req,res){
        var uId = req.params['userId'];
        for(var usr in users){
            var user = users[usr];
            if(user._id === uId){
                var newUser = req.body;
                user.firstName = newUser.firstName;
                user.lastName = newUser.lastName;
                user.email = newUser.email;
                res.status(200).json(user);
                return;
            }
        }
        res.status(404).send('User not found for id: ' + uId);;
    }

    function deleteUser(req,res){
        var uId = req.params['userId'];
        var uIndex = -1;
        for(var usr in users){
            var user = users[usr];
            if(user._id === uId){
                uIndex = usr;
                break;
            }
        }
        if(uIndex != -1){
            res.sendStatus(200);
            return;
        }
        res.status(404).send('User not found for id: ' + uId);;
    }

};
