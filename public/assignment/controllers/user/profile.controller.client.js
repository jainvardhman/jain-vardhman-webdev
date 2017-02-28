/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("ProfileController",profileController);

    function profileController($routeParams,UserService,$location){
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.update = update;
        vm.websites = navWebsites;
        vm.logout = navLogin;
        vm.profile = navProfile;

        function init(){
            var promise = UserService.findUserById(vm.userId);
            promise
                .success(function(user){
                    vm.user = user;
                })
                .error(function(err){
                    vm.error = 'User not found';
                });
        }

        init();

        function update(newUser){
            var promise = UserService.updateUser(vm.userId,newUser);
            promise
                .success(function(user){
                    vm.message = "User successfully updated";
                })
                .error(function(err){
                    vm.error = "User could not be updated";
                });
        }

        function navWebsites(){
            $location.url('/user/' + vm.userId + '/website');
        }

        function navLogin(){
            $location.url('/login');
        }

        function navProfile(){
            $location.url('/user/' + vm.userId);
        }
    }

})();
