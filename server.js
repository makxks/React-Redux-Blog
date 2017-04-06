const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
var db = require('./db.js');

app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

db.sequelize.sync().then(function(){
	app.listen(PORT,function(){
		console.log('Express listening on port ' + PORT + '!');
	});
});
