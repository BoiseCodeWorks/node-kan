(function () {
	'use strict';

	angular.module('NodeKan')

	.factory('storyDataApi', ['$q', '$http', function ($q, $http) {

		var urlBase = '/api/';

		function getLists() {

			var deferred = $q.defer();
			
			$http.get(urlBase + 'lists').then(
				function (resp) {
					if (resp.ok) {
						deferred.resolve(resp.data);
					}
					else {
						deferred.reject(resp.statusText);
					}
				}
			);
			
			return deferred.promise;
		}
		
		function getPerson(id) {

			var deferred = $q.defer();
			
			$http.get(urlBase + 'people/' + id).then(function (data) {

				if (resp.status === 200) {
					deferred.resolve(resp.data.results);
				}
				else {
					deferred.reject(resp.statusText);
				}
			});
			
			return deferred.promise;
		}

		return {
			getPeople: getPeople,
			getPerson: getPerson
		};
	}]);
})();