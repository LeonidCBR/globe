const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);


app.get('/', (req, res) => {
	res.send('<h3>OK</h3>');
});


const users = {};

io.on('connection', (socket) => {
	console.log('User connected.');
	console.log('Socket id: ' + socket.id);

	/** FOR DEBUG PURPOSE
	socket.onAny((event, ...args) => {
		console.log(`got new event [${event}]`);
	});
	*/

	socket.on('hello', (username) => {
		console.log('hello ' + username);
		users[socket.id] = username;
	})

	socket.on('message', (message) => {

		console.log('we got a message');

		if (message.type == 0) {
			console.log('it\'s text: ');
			console.log(message.body);
		}
		
	});

	socket.on('disconnect', (reason) => {
		console.log('User ' + users[socket.id] + ' disconnected');
	});
});


server.listen(3000, () => {
	console.log('Listening on *:3000');
});




/*
io.on('disconnect', (reason) => {
	console.log('User disconnected');
});
*/
