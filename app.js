let express = require('express');
let app = express();

app.set('view engine', 'twig');

app.get('/', function (request, response) {
    response.render('index.html.twig', {'name': 'John Doe'})
});

let server = app.listen(8081, function () {
    console.log('Valentine app listening on port ' + server.address().port);
});