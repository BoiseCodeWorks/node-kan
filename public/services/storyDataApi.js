(function () {
	'use strict';

	angular.module('NodeKan')

	.factory('storyDataApi', ['$q', '$resource', function ($q, $resource) {

		var listApi = $resource('/api/lists/:id', {},
		{
			'fetch': { method: 'GET', isArray: false },
			'save': { method: 'POST', isArray: false },
			'update': { method: 'PUT', isArray: false }
		});

		var cardApi = $resource('/api/cards/:id', {},
		{
			'fetch': { method: 'GET', isArray: false },
			'save': { method: 'POST', isArray: false },
			'update': { method: 'PUT', isArray: false }
		});

		function addList(list) {

			var deferred = $q.defer();
			var params = list;

			listApi.save(params,
				function (result) {
					if (result.ok) {
						deferred.resolve(result.data);
					}
					else {
						deferred.reject(result.error);
					}
				},
				function (err) {
					deferred.reject(err);
				}			
			);

			return deferred.promise;
		}	
		
		function getLists() {

			var deferred = $q.defer();
			var params = {};
			
			listApi.fetch(params,
				function (result) {
					if (result.ok) {
						deferred.resolve(result.data);
					}
					else {
						deferred.reject(result.error);
					}
				},
				function (err) {
					deferred.reject(err);
				}			
			);
			
			return deferred.promise;
		}
		
		function getCards(listId) {

			var deferred = $q.defer();
			var params = {
				id: listId
			};
			
			cardApi.fetch(params,
				function (result) {
					if (result.ok) {
						deferred.resolve(result.data);
					}
					else {
						deferred.reject(result.error);
					}
				},
				function (err) {
					deferred.reject(err);
				}			
			);
			
			return deferred.promise;
		}
		
		function addCard(card) {

			var deferred = $q.defer();
			var params = card;

			cardApi.save(params,
				function (result) {
					if (result.ok) {
						deferred.resolve(result.data);
					}
					else {
						deferred.reject(result.error);
					}
				},
				function (err) {
					deferred.reject(err);
				}			
			);

			return deferred.promise;
		}	

		return {
			addList: addList,
			getLists: getLists,
			addCard: addCard,
			getCards: getCards
		};
	}]);
})();