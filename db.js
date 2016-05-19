(function () {

	var path = require('path');	
	var uuid = require('node-uuid');	
	var JSData = require('js-data');	
	var DSNedbAdapter = require('js-data-nedb');
	
	var store = new JSData.DS();
	var adapter = new DSNedbAdapter();

	store.registerAdapter('nedb', adapter, { default: true });

	var List = store.defineResource({
		name: 'list',
		filepath: path.join(__dirname, '/data/listData.db'),
		relations: {
			hasMany: {
				card: {
					localField: 'cards',
					foreignKey: 'listId'
				}
			}
		}
	});	
	
	var Card = store.defineResource({
		name: 'card',
		filepath: path.join(__dirname, '/data/cardData.db'),
		relations: {
			belongsTo: {
				list: {
					localField: 'list',
					foreignKey: 'listId'
				}
			}
		}
	});	

	function getLists() {

		var params = {};
		
		var options = {
			with: ['card']
		};
		
		return List.findAll(params, options);	
	}
	
	function addList(name, description) {

		return List.create({
			id: uuid.v4(),
			name: name
		});			
	}	
	
	function saveList(list) {

		return List.update(list.Id, list);				
	}	
	
	function deleteList(list) {

		return List.destroy(list.Id);				
	}	
	
	function getCards(listId) {

		var params = {
			where: {
    			listId: {
      				'==': listId
    			}
  			}
		};
		
		return Card.findAll(params);	
	}
	
	function addCard(listId, summary, detail) {

		return Card.create({
			id: uuid.v4(),
			listId: listId,
			summary: summary,
			detail: detail
		});		
	}	
	
	function saveCard(card) {

		return Card.update(card.Id, card);				
	}	
	
	function deleteCard(card) {

		return Card.destroy(card.Id);				
	}	
	
	module.exports = {
		getLists: getLists,
		addList: addList,
		saveList: saveList,
		deleteList: deleteList,
		getCards: getCards,
		addCard: addCard,
		saveCard: saveCard,
		deleteCard: deleteCard
	};
})();