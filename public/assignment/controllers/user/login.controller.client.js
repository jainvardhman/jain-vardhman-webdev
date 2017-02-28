/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("LoginController",loginController);

    function loginController(UserService,$location){
        var vm = this;
        vm.login = login;
        vm.register = navRegister;

        function init(){
        }
        init();

        function login(user){
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise
                .success(function (user) {
                    var loginUser = user;
                    if(loginUser != null) {
                        $location.url('/user/' + loginUser._id);
                    } else {
                        vm.error = 'Invalid username or password';
                    }
                })
                .error(function(err){
                    vm.error = err;
                });
        }

        function navRegister(){
            $location.url('/register');
        }
    }

})();
