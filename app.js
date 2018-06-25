/**
 * Require needed dependencies and resources.
 */
let express = require('express');
let sassMiddleware = require('node-sass-middleware');
let path = require('path');
let app = express();

/**
 * Set templating engine to twig.
 */
app.set('view engine', 'twig');

/**
 * Configure app to use middleware.
 */
app.use(sassMiddleware({
    src: path.join(__dirname, 'assets'),
    dest: path.join(__dirname, 'build'),
    outputStyle: 'compressed',
    prefix: '/vendor'
}));

/**
 * Expose public directory.
 */
app.use('/public', express.static(path.join(__dirname, 'build')));

/**
 * Routing configuration.
 */
app.get('/', function (request, response) {
    response.render('index.html.twig', {'name': 'John Doe'})
});

/**
 * Let teh server listen for requests on a certain port.
 */
let server = app.listen(8081, function () {
    console.log('Valentine app listening on port ' + server.address().port);
});