/**
 * Created by Vardhman on 2/9/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService',userService);

    function userService($http){
        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(newUser){
            return $http.post('/api/user',newUser);
        }

        function findUserById(uId){
            return $http.get('/api/user/' + uId);
        }

        function findUserByUsername(uName){
            return $http.get('/api/user?username=' + uName);
        }

        function findUserByCredentials(uId,uPwd){
            return $http.get('/api/user?username=' + uId + '&password=' + uPwd);
        }

        function updateUser(uId,newUser){
            return $http.put('/api/user/' + uId,newUser);
        }

        function deleteUser(uId) {
            return $http.delete('/api/user/' + uId);
        }
    }

})();
