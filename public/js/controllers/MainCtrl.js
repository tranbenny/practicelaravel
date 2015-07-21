angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {
	$scope.tagline = 'Enter to do items here: ';
	$scope.toDoItem = {};

	$http.get('/api/items').success(function(data) {
		$scope.items = data;
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});


	$scope.add = function() {
		$http.post('/api/items', $scope.toDoItem)
			.success(function(data) {
				$scope.toDoItem = {};
				$scope.items = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.update = function(item) {
		$http.put('/api/items/' + item._id).success(function(data) {
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	$scope.delete = function(item) {
		$http.delete('/api/items/' + item._id).success(function(data) {
			console.log(data);
			$http.get('/api/items').success(function(data) {
				$scope.items = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			})
		})
		.error(function(data) {
			console.log("Error: " + data)
		});
	}


});