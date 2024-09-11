var app = angular.module('countryApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'country-list.html',
        controller: 'CountryListController'
    })
    .when('/country/:name', {
        templateUrl: 'country-detail.html',
        controller: 'CountryDetailController'
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.controller('CountryListController', function($scope, $http) {
    $http.get('countries.json').then(function(response) {
        $scope.countries = response.data;
    });
});

app.controller('CountryDetailController', function($scope, $http, $routeParams) {
    $http.get('countries.json').then(function(response) {
        var allCountries = response.data;
        $scope.country = allCountries.find(function(country) {
            return country.name === $routeParams.name;
        });
    });
});

// Custom filter to convert array of objects into comma-separated strings
app.filter('mapToString', function() {
    return function(input, key) {
        return input.map(function(item) {
            return item[key];
        }).join(', ');
    };
});
