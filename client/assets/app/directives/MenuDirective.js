/*Directives menu*/
ltkApp.directive('menuprofil', function(){
    return {
        restrict: 'A',
        templateUrl: "/templates/menu/profil.html"
    }
});
ltkApp.directive('menufollowings', function(){
    return {
        restrict: 'A',
        templateUrl: "/templates/menu/followings.html"
    }
});
ltkApp.directive('menutalents', function(){
    return {
        restrict: 'A',
        templateUrl: "/templates/menu/talents.html"
    }
});