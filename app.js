/**
 * Require needed dependencies and resources.
 */
let express = require('express');
let sassMiddleware = require('node-sass-middleware');
let dotenv = require('dotenv');
let passport = require('passport');
let passportGoogleOAuth = require('passport-google-oauth20');
let path = require('path');
let app = express();

/**
 * Environment variables
 */
dotenv.config();

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
 * Authentication strategy.
 */
let GoogleStrategy = passportGoogleOAuth.Strategy;
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: "https://d3adspace.de/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, callback) {

    }
));

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

app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));
app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), function (req, res) {
    res.redirect('/');
});

/**
 * Let teh server listen for requests on a certain port.
 */
let server = app.listen(3001, function () {
    console.log('Valentine app listening on port ' + server.address().port);
});