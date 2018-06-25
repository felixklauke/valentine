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
    dest: path.join(__dirname, 'public/build'),
    outputStyle: 'compressed',
    prefix: '/vendor',
}));

/**
 * Expose directories and library access.
 */
app.use('/vendor', express.static(path.join(__dirname, 'public/build')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/popper', express.static(path.join(__dirname, 'node_modules/popper.js/dist')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

/**
 * Routing configuration.
 */
const dashboardController = require('./routes/dashboardController');
app.use('/', dashboardController);

/**
 * Let teh server listen for requests on a certain port.
 */
let server = app.listen(8081, function () {
    console.log('Valentine app listening on port ' + server.address().port);
});