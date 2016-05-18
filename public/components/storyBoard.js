(function () {
	'use strict';

	angular.module('NodeKan')

	.component('storyBoard', {
		templateUrl: 'templates/storyBoard.html',
		controller: storyBoardController,
		controllerAs: 'vm'
	});

	storyBoardController.$inject = ['storyDataApi'];

	function storyBoardController(dataApi) {
		
		var vm = this;

		vm.$onInit = activate;
        		
		vm.lists = [];
		
		function activate() {
			
            vm.getLists = function(){

                dataApi.getLists().then(
					function (lists) {
                    	vm.lists = lists;
					}
				);
            };
			
            vm.getLists();
		}	

	}	
})();