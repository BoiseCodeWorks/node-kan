(function () {

	var uuid = require('node-uuid');	
	var JSData = require('js-data');	
	var DSNedbAdapter = require('js-data-nedb');
	
	var store = new JSData.DS();
	var adapter = new DSNedbAdapter();

	store.registerAdapter('nedb', adapter, { default: true });

	var List = store.defineResource({
		name: 'list',
		filepath: __dirname + '/data/listData.db',
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
		filepath: __dirname + '/data/cardData.db',
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

		return new Promise(function (resolve, reject) {
			
			List.findAll().then(function (lists) {
				
				List.loadRelations(lists[0], ['card']).then(function (list) {
					console.log(list);
				});
			});
		});		

	}
	
	function addList(name) {

		return List.create({
			id: uuid.v4(),
			name: name
		});			
	}	
	
	function addCard(listId, summary, detail) {

		return Card.create({
			id: uuid.v4(),
			listId: listId,
			summary: summary,
			detail: detail
		});		
	}	
	
	module.exports = {
		getLists: getLists,
		addList: addList,
		addCard: addCard
	};
})();