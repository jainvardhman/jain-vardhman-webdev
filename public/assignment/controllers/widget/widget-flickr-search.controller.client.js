/**
 * Created by Vardhman on 3/9/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController",flickrImageSearchController);

    function flickrImageSearchController($routeParams,FlickrService,WidgetService,$location,$http) {
        var vm = this;
        vm.developerId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageid = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
        vm.widgetList = navWidgets;
        vm.edit = navWidgetEdit;

        function searchPhotos(searchTerm) {
            FlickrService.searchPhotos(searchTerm)
                .success(function (res) {
                    data = res.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                })
                .error(function (err) {
                    vm.error = err.message;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {
                "_id": vm.widgetId, "type": "IMAGE",
                "_page": vm.pageid, "width": "100%", "url": url
            };
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .success(function (widget) {
                    navWidgets();
                })
                .error(function (err) {
                    vm.error = err.message;
                });
        }

        function navWidgets() {
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + '/widget');
        }

        function navWidgetEdit(widgetId) {
            $location.url('/user/' + vm.developerId + '/website/' + vm.websiteId + '/page/' + vm.pageid + "/widget/" + widgetId);
        }
    }
})();
