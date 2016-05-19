(function () {

	var router = require('express').Router();
	var db = require('./db');

	router.route('/lists')
		.get(getLists)
		.post(createList)
		.put(updateList);

	router.route('/cards/:id?')
		.get(getCards)
		.post(createCard)
		.put(updateCard);
	
	router.use(defaultErrorHandler);

	function getLists(req, res, next) {

		db.getLists().then(
			function (lists) {
				res.json({
					ok: true,
					data: lists
				});
			}
		);
	}	
	
	function createList(req, res, next) {

		db.addList(req.body.name, req.body.description).then(
			function (list) {
				res.json({
					ok: true,
					data: list
				});
			}
		);
	}	
	
	function updateList(req, res, next) {

		db.saveList(req.body).then(
			function (list) {
				res.json({
					ok: true,
					data: list
				});
			}
		);
	}	

	function getCards(req, res, next) {

		db.getCards(req.params.id).then(
			function (cards) {
				res.json({
					ok: true,
					data: cards
				});
			}
		);
	}	
	
	function createCard(req, res, next) {

		db.addCard(req.body.listId, req.body.summary, req.body.detail).then(
			function (card) {
				res.json({
					ok: true,
					data: card
				});
			}
		);
	}	
	
	function updateCard(req, res, next) {

		db.saveCard(req.body).then(
			function (card) {
				res.json({
					ok: true,
					data: card
				});
			}
		);
	}	

	function defaultErrorHandler(err, req, res, next) {
		
		res.json({
			ok: false,
			error: err
		});
	}

	exports.router = router;
	
})();
