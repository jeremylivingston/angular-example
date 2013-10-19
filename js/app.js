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
                var data = {
                    applicants: [
                        { id: 1, first_name: 'Joe', last_name: 'Williams', approved: null, address: '1234 Test Lane', city: 'New York City', state: 'NY', zip: '10108', phone: '3131234567', email: 'joe@example.com', referrer: 'Web', high_school: 'New York High', gpa: '3.3', program: { id: 1, name: 'Fall 2014' } },
                        { id: 2, first_name: 'Bill', last_name: 'Witherspoon', approved: null, address: '1234 Test Lane', city: 'New York City', state: 'NY', zip: '10108', phone: '3131234567', email: 'joe@example.com', referrer: 'Web', high_school: 'New York High', gpa: '3.3', program: { id: 1, name: 'Fall 2014' } }
                    ],
                    programs: [
                        { id: 1, name: 'Fall 2014' },
                        { id: 2, name: 'Winter 2014' }
                    ]
                };

                deferred.resolve(data);
            }, 1000);

            return deferred.promise;
        }
    };
}]);

var applicantControllers = angular.module('applicantControllers', []);

applicantControllers.controller('ApplicantListCtrl', ['$scope', 'applicantProvider', function($scope, applicantProvider) {
    $scope.applicants = [];
    $scope.programs = [];
    $scope.applicant = {};

    // Initialize the lists
    applicantProvider.init().then(function(data) {
        $scope.applicants = data.applicants;
        $scope.programs = data.programs;
    });

    $scope.view = function(applicant) {
        $scope.applicant = applicant;
        $('#viewModal').modal('toggle');
    };

    $scope.toggleApproval = function(applicant) {
        $scope.applicant = applicant;
        $('#approvalModal').modal('toggle');
    };

    $scope.toggleRejection = function(applicant) {
        $scope.applicant = applicant;
        $('#rejectionModal').modal('toggle');
    };

    $scope.approve = function(applicant) {
        // Make an HTTP call to accomplish this
        applicant.approved = true;
    };

    $scope.reject = function(applicant) {
        // Make an HTTP call to accomplish this
        applicant.approved = false;
    };

    $scope.displayApproved = function(applicant) {
        if (applicant == null) {
            return '';
        }

        if (applicant.approved == null) {
            return 'Applied';
        }

        return (applicant.approved) ? 'Approved' : 'Rejected';
    };
}]);