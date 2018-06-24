let express = require('express');
let app = express();

app.get('/', function (request, response) {
    response.send('Hello World');
});

let server = app.listen(8081, function () {
    console.log('Valentine app listening on port ' + server.address().port);
});