let express = require('express');
let router = express.Router();

/**
 * Route: $domain/
 */
router.get('/', function (request, response) {
    response.render('index.html.twig',)
});

module.exports = router;