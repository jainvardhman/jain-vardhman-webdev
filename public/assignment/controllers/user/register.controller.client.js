/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("RegisterController",registerController);

    function registerController(UserService,$location){
        var vm = this;

        function init(){
            vm.register = register;
            vm.cancel = navLogin;
        }

        init();

        function register(newUser){
            newUser._id = (new Date).getTime.toString();
            var promise = UserService.createUser(newUser);
            promise
                .success(function(user){
                    $location.url('/user/' + user._id);
                })
                .err(function(err){
                    vm.error = "User could not be created";
                });
        }

        function navLogin(){
            $location.url('/login');
        }
    }

})();
