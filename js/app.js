var applicantApp = angular.module('applicantApp', [
    'angular-flash.service',
    'angular-flash.flash-alert-directive',
    'applicantControllers',
    'ngRoute'
]);

applicantApp.factory('applicantProvider', ['$http', '$q', function($http, $q) {
    return {
        list: [],

        init: function() {
            var deferred = $q.defer();

            setTimeout(function() {
                var data = [
                    { id: 1, first_name: 'Joe', last_name: 'Williams', approved: null },
                    { id: 2, first_name: 'Bill', last_name: 'Witherspoon', approved: null }
                ];

                deferred.resolve(data);
            }, 1000);

            return deferred.promise;
        }
    };
}]);

var applicantControllers = angular.module('applicantControllers', []);

applicantControllers.controller('ApplicantListCtrl', ['$scope', 'applicantProvider', function($scope, applicantProvider) {
    var applicantPromise = applicantProvider.init();

    applicantPromise.then(function(applicants) {
        $scope.applicants = applicants;
    });

    $scope.displayApproved = function(applicant) {
        if (applicant == null) {
            return '';
        }

        if (applicant.approved == null) {
            return 'Applied';
        }

        return (applicant.approved) ? 'Approved' : 'Rejected';
    }
}]);


applicantControllers.controller('ApplicantViewCtrl', ['$scope', '$rootScope', 'applicantProvider', function($scope, $rootScope, applicantProvider) {
    $scope.applicant = {};

    $rootScope.$on('$routeChangeStart', function(evt, next, current) {
        // I want this to set $scope.applicant and toggle the modal on
    });
}]);