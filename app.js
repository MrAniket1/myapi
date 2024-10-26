// app.js
const app = angular.module('userApp', []);

// Define the UserController
app.controller('UserController', function ($scope, $http) {
    const apiUrl = 'https://myapi-fmd8.onrender.com/api/users'; // Change to your backend API URL

    // Initialize user list and new user object
    $scope.users = [];
    $scope.newUser = {
        location_info: {
            country: 'India', // This field will not be shown but will still be part of the user object
            currency: 'INR',  // This field will not be shown but will still be part of the user object
            dial_code: '+91'  // This field will not be shown but will still be part of the user object
        },
        premiumUsageObject: {
            attachment: false,
            batching: false,
            caption: false,
            customisation: false,
            groupContactExport: false,
            multipleAttachment: false,
            quickReplies: false,
            schedule: false,
            stop: false,
            timeGap: false
        },
        plan_type: 'Expired' // Default value can be set here if needed
    };

    // Fetch all users
    $scope.getUsers = function () {
        $http.get(apiUrl).then(function (response) {
            $scope.users = response.data;
        }, function (error) {
            console.error("Error fetching users:", error);
        });
    };

    // Add a new user
    $scope.addUser = function () {
        $http.post(apiUrl, $scope.newUser).then(function (response) {
            $scope.users.push(response.data);
            $scope.newUser = {  // Reset the form after adding
                premiumUsageObject: {
                    attachment: false,
                    batching: false,
                    caption: false,
                    customisation: false,
                    groupContactExport: false,
                    multipleAttachment: false,
                    quickReplies: false,
                    schedule: false,
                    stop: false,
                    timeGap: false
                },
                plan_type: 'Expired' // Resetting plan type after addition
            };
        }, function (error) {
            console.error("Error adding user:", error);
        });
    };

    // Function to delete a user
    $scope.deleteUser = function (id) {
        $http.delete(apiUrl + '/' + id).then(function (response) {
            $scope.users = $scope.users.filter(user => user._id !== id);
        }, function (error) {
            console.error("Error deleting user:", error);
        });
    };

    // Initial fetch of users
    $scope.getUsers();
});
