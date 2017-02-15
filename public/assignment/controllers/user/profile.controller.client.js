/**
 * Created by Vardhman on 2/10/2017.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("ProfileController",profileController);

    function profileController($routeParams,UserService,$location){
        var vm = this;


        function init(){
            vm.userId = $routeParams['uid'];
            vm.update = update;
            vm.websites = navWebsites;
            vm.logout = navLogin;
            vm.profile = navProfile;
            vm.user = UserService.findUserById(vm.userId);
        }

        init();

        function update(newUser){
            var user = UserService.updateUser(vm.userId,newUser);
            if(user == null){
                vm.error = "User could not be updated";
            } else{
                vm.message = "User successfully updated";
            }
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
