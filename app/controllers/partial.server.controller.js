exports.render = function(req, res) {
	res.render('.' + req.path); // dot(.) for root path
};