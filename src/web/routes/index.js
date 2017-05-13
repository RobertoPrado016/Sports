var express = require('express');
var router = express.Router();

router.get('/home', loggedIn, function(req, res, next) {
	console.log('HOME/'+req.user.user.username+":");
	res.sendFile(req.app.get("admin_path")+"index.html");
});
router.get('/home/:username', function(req, res, next) {
	console.log('HOME/'+username+":");
	console.log(req.user);
	res.sendFile(req.app.get("admin_path")+"index.html");
});
router.get('/', function(req, res, next) {
res.sendFile(req.app.get("admin_path")+"auth.html");
console.log(req.path);
});
router.get('/signin', function(req, res, next) {
res.sendFile(req.app.get("admin_path")+"auth.html");
console.log(req.path);

});
router.get('/signup', function(req, res, next) {
res.sendFile(req.app.get("admin_path")+"reg.html");
console.log(req.path);

});
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/signin');
    }
}

module.exports = router;