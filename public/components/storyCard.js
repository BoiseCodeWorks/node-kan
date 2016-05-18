(function () {
	'use strict';

	angular.module('NodeKan')

	.component('storyCard', {
		bindings: {
			story: '<'
		},
		require: {
        	tasks: '^storyList'
    	},
		templateUrl: 'templates/storyCard.html',
		controller: storyCardController,
		controllerAs: 'vm'
	});

	storyCardController.$inject = [];
	
	function storyCardController() {

		var vm = this;

		vm.$onInit = function () {
			console.log('Story: ', vm.story);
		}
	}
})();