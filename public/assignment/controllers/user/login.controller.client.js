/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("LoginController",loginController);

    function loginController(UserService,$location){
        var vm = this;

        function init(){
            vm.login = login;
            vm.register = navRegister;
        }
        init();

        function login(user){
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if(loginUser != null){
                $location.url('/user/' + loginUser._id);
            } else{
                vm.error = 'Invalid username or password';
            }
        }

        function navRegister(){
            $location.url('/register');
        }
    }

})();
