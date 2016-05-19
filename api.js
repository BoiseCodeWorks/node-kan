(function () {

	var router = require('express').Router();
	var db = require('./db');


	
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

		db.saveList(req).then(
			function (list) {
				res.json({
					ok: true,
					data: list
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
