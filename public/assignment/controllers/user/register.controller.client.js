/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("RegisterController",registerController);

    function registerController(UserService,$location){
        var vm = this;
        vm.register = register;
        vm.cancel = navLogin;

        function init(){
        }

        init();

        function register(newUser){
            //newUser._id = (new Date).getTime.toString();
            var promise = UserService.createUser(newUser);
            promise
                .then(function(user){
                    console.log(user.data._id);
                    $location.url('/user/' + user.data._id);
                },
                function(err){
                    vm.error = "User could not be created";
                })
        }

        function navLogin(){
            $location.url('/login');
        }
    }

})();
