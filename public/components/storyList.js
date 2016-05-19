(function () {
	'use strict';

	angular.module('NodeKan')

	.component('storyList', {
		bindings: {
			list: '<'
		},
		require: {
        	board: '^storyBoard'
    	},
		templateUrl: 'templates/storyList.html',
		controller: storyListController,
		controllerAs: 'vm'
	})
	.controller('addCardModalController', addCardModalController);

	storyListController.$inject = ['storyDataApi', '$uibModal'];
	addCardModalController.$inject = ['$uibModalInstance'];

	function storyListController(dataApi, $uibModal) {
		
		var vm = this;

		vm.$onInit = activate;
        		
		vm.stories = [];
		
		vm.addCard = function () {
			
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'addCardModal.html',
				controller: 'addCardModalController',
				controllerAs: 'vm',
				size: 'md'
			});

			modalInstance.result.then(
				function (card) {
					
					card.listId = vm.list.id;
					
					dataApi.addCard(card).then(
						function (newCard) {
							console.log('New Card: ', newCard);
							vm.stories.push(newCard);
						}
					);
				},
				function () {
					// canceled
				}
			);
		}

		function activate() {
			
            vm.getStories = function() {

                // dataApi.getStories(vm.list.Id).then(
				// 	function (stories) {
                //     	vm.stories = stories;
				// 	}
				// );
            };
			
            vm.getStories();
		}	

	}	
})();