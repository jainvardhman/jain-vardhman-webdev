/**
 * Created by Vardhman on 2/9/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService',userService);

    function userService(){
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , email: "wonderland.a@gmail.com" },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley" , email: "marley.b@gmail.com" },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia" , email: "garcia.c@gmail.com" },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "annunzi.j@gmail.com" }
        ];

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser/*(uId, uName, uPwd, uFName, uLName, uEmail)*/(newUser){
            /*var newUser = {_id: uId ,
                            username: uName,
                            password: uPwd,
                            firstName: uFName,
                            lastName: uLName,
                            email: uEmail};*/
            if(newUser.password != newUser.verify)
                return null;
            for(usr in users){
                var user = users[usr];
                if(user.username === newUser.username || user._id === newUser._id)
                    return null;
            }
            users.push(newUser);
            return angular.copy(newUser);
        }

        function findUserById(uId){
            for(var usr in users){
                var user = users[usr];
                if(user._id === uId)
                    return angular.copy(user);
            }
            return null;
        }

        function findUserByUsername(uName){
            for(var usr in users){
                var user = users[usr];
                if(user.username === uName)
                    return angular.copy(user);
            }
            return null;
        }

        function findUserByCredentials(uId,uPwd){
            for(var usr in users){
                var user = users[usr];
                if(user.username === uId && user.password === uPwd)
                    return angular.copy(user);
            }
            return null;
        }

        function updateUser(uId,newUser){
            for(var usr in users){
                var user = users[usr];
                if(user._id === uId){
                    user.firstName = newUser.firstName;
                    user.lastName = newUser.lastName;
                    user.email = newUser.email;
                    return angular.copy(user);
                }
            }
            return null;
        }

        function deleteUser(uId){
            var uIndex = -1;
            for(var usr in users){
                var user = users[usr];
                if(user._id === uId){
                    uIndex = usr;
                    break;
                }
            }
            if(uIndex != -1){
                users.splice(uIndex,1);
                return {success : "true"};
            }
            return {success : "false"};
        }
    }

})();
