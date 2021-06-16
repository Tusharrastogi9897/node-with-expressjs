const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const hostname = 'localhost';
const port  = 3000;

const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const dishRouter = require('./routes/dishRouter');

const app = express();
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

app.use((req, res, next) => {
	console.log(req.headers);

	res.statusCode = 200;
	res.setHeader('Content-Type','text/plain');
});

const server = http.createServer(app);
server.listen(port,hostname,() => {
	console.log(`Server is up and running on http://${hostname}:${port}`);
})
