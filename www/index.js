var FPApp = angular.module("FPApp", ['ionic']);

FPApp.service("FPSvc", ["$http", "$rootScope", FPSvc]);

FPApp.controller("FPCtrl", ["$scope", "$sce", "$ionicLoading", "FPSvc", FPCtrl]);

function FPCtrl($scope, $sce, $ionicLoading, FPSvc) {

    $ionicLoading.show({
        template: "Loading blogs..."
    });

    $scope.blogs = [];
    $scope.$on("FPApp.blogs", function(_, result) {
        result.posts.forEach(function(b) {
            $scope.blogs.push({
                name: b.author.name,
                avatar_URL: b.author.avatar_URL,
                title: $sce.trustAsHtml(b.title),
                URL: b.URL,
                excerpt: $sce.trustAsHtml(b.excerpt),
                featured_image: b.featured_image
            });
        });

        $ionicLoading.hide();
    });

    FPSvc.loadBlogs();
}

function FPSvc($http, $rootScope) {
    this.loadBlogs = function() {
        $http.get("https://public-api.wordpress.com/rest/v1/freshly-pressed/")
            .success(function(result) {
                $rootScope.$broadcast("FPApp.blogs", result);
            });
    }
}