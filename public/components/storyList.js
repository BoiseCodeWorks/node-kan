(function () {
	'use strict';

	angular.module('NodeKan')

	.component('storyList', {
		bindings: {
			name: '<'
		},
		require: {
        	board: '^storyBoard'
    	},
		templateUrl: 'templates/storyList.html',
		controller: storyListController,
		controllerAs: 'vm'
	});

	storyListController.$inject = ['storyDataApi'];

	function storyListController(dataApi) {
		
		var vm = this;

		vm.$onInit = activate;
        		
		vm.stories = [];
		
		function activate() {
			
            vm.getStories = function() {

                storyDataApi.getStories(vm.name).then(
					function (stories) {
                    	vm.stories = stories;
					}
				);
            };
			
            vm.getStories();
		}	

	}	
})();