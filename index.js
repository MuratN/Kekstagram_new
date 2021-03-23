const express = require('express');
const path = require('path');
const source = require('./source.json');

const app = express(); 

const port = 7777;

app.get('/kekstagram/data', function(req, res) {
    res.set('Content-Type', 'application/json; charset=utf-8'); 

	res.end(JSON.stringify(source));
});

app.post('/kekstagram/data', function(req, res) {
    console.log('POST request data');
    console.log(req.body);
	res.end();
}); 
app.use('/', express.static(path.join(__dirname , 'src')));
app.listen(port, function() {
	console.log('app running on port ' + port); 
}); 
