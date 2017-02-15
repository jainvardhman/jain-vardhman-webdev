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
            var user = UserService.createUser(newUser);
            if(user == null){
                vm.error = "User could not be created";
            } else{
                $location.url('/user/' + user._id);
            }
        }

        function navLogin(){
            $location.url('/login');
        }
    }

})();
