(function () {
	'use strict';

	angular.module('NodeKan')

	.component('storyBoard', {
		templateUrl: 'templates/storyBoard.html',
		controller: storyBoardController,
		controllerAs: 'vm'
	})
	.controller('addListModalController', addListModalController);

	storyBoardController.$inject = ['storyDataApi', '$uibModal'];
	addListModalController.$inject = ['$uibModalInstance'];

	function storyBoardController(dataApi, $uibModal) {
		
		var vm = this;

		vm.$onInit = activate;
        		
		vm.lists = [];

		vm.addList = function () {
			
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'addListModal.html',
				controller: 'addListModalController',
				controllerAs: 'vm',
				size: 'md'
			});

			modalInstance.result.then(
				function (list) {
					dataApi.addList(list).then(
						function (newList) {
							console.log('New List: ', newList);
							vm.lists.push(newList);
						}
					);
				},
				function () {
					// canceled
				}
			);
		}
		
		function activate() {
			
            vm.getLists = function(){

                dataApi.getLists().then(
					function (lists) {
						console.log('Lists: ', lists);
                    	vm.lists = lists;
					}
				);
            };
			
            vm.getLists();
		}	
	}	

	function addListModalController($uibModalInstance) {

		var vm = this;

		vm.list = {
			name: '',
			description: ''
		};

		vm.ok = function () {
			$uibModalInstance.close(vm.list);
		};

		vm.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}
})();