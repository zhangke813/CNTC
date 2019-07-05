var net = require('net')

var REPLY_CODE = {
  "110": "Restart marker reply.",
  "120": "Service ready in nn minutes.",
  "125": "Data Connection already open; transfer starting.",
  "150": "File status okay; about to open data connection.",
  "200": "Command okay.",
  "202": "Command not implemented, superfluous at this site.",
  "211": "System status, or system help reply.",
  "212": "Directory status.",
  "213": "File status.",
  "214": "Help message.",
  "215": "NAME system type.",
  "220": "Service ready for new user.",
  "221": "Service closing control connection.",
  "225": "Data connection open; no transfer in progress.",
  "226": "Closing data connection.",
  "227": "Entering Passive Mode.",
  "230": "User logged in, proceed. This status code appears after the client sends the correct password. It indicates that the user has successfully logged on.",
  "250": "Requested file action okay, completed.",
  "257": "'\"'PATHNAME'\"' created.",
  "331": "User name okay, need password.",
  "332": "Need account for login.",
  "350": "Requested file action pending further information.",
  "421": "Error 421 Service not available, closing control connection.\n            Error 421 User limit reached\n            Error 421 You are not authorized to make the connection\n            Error 421 Max connections reached\n            Error 421 Max connections exceeded",
  "425": "Cannot open data connection.",
  "426": "Connection closed; transfer aborted.",
  "450": "Requested file action not taken.",
  "451": "Requested action aborted: local error in processing.",
  "452": "Requested action not taken. Insufficient storage space in system.",
  "500": "Syntax error, command unrecognized, command line too long.",
  "501": "Syntax error in parameters or arguments.",
  "502": "Command not implemented.",
  "503": "Bad sequence of commands.",
  "504": "Command not implemented for that parameter.",
  "530": "User not logged in.",
  "532": "Need account for storing files.",
  "550": "Requested action not taken. File unavailable, not found, not accessible",
  "552": "Requested file action aborted. Exceeded storage allocation.",
  "553": "Requested action not taken. File name not allowed.",
  "10054": "Connection reset by peer. The connection was forcibly closed by the remote host.",
  "10060": "Cannot connect to remote server.",
  "10061": "Cannot connect to remote server. The connection is actively refused by the server.",
  "10066": "Directory not empty.",
  "10068": "Too many users, server is full."
}

var COMMANDS = {
	AUTH: function() {
		this.send('502 SSL/TLS authentication not allowed.')
	},
	USER: function(username) {
		this.session.username = username
		this.send('331 User name okay, need password.')
	},
	PASS: function(password) {
		var socket = this
		var username = socket.username

		if (username == 'newghost' && password == 'dachun') {
			socket.send(230, 'Logged on')
		} else {
			socket.send(450, 'Ensure that you typed the correct user name and password combination.')
		}
	},
	PWD: function(args) {
		this.send('257 "/" is current directory')
	},
	TYPE: function(args) {
		this.send('200 Type set to I')
	},
	EPSV: function(args) {
		this.send('229 Entering Extended Passive Mode (|||30324|).')
	},
	PASV: function(args) {
		this.send('227 Entering Passive Mode (112,124,126,185,165,12).')
	},
	MLSD: function(args) {
		this.send('226 Successfully transferred "/"')
	},
	LIST: function(args) {
		this.send('502 Command not implemented.')

		this.send('502')
	}
}


var sendHandler = function(type, message) {
	var socket = this
	var command

	if (arguments.length < 2) {
		if (REPLY_CODE[type]) {
			command = REPLY_CODE[type]
		} else {
			command = type.toString()
		}
	} else {
		command = type + ' ' + message
	}

	console.log('S:', command)

	socket.write(command + '\r\n')
}

var ftpServer = net.createServer(function(socket) {
	socket.session = {}
	socket.send = sendHandler

	socket.send(220, 'Welcome to OnceDoc FTP Server')

	var onCommand = function(buffer) {
		//receives.push(data)
		//var buffer  = Buffer.concat(receives).toString()
		//receives = []
		var buffers = buffer.toString()
		var lines = buffers.split('\r\n')

		for (var i = 0, l = lines.length; i < l; i++) {
			var line = lines[i]
			if (line) {
				console.log('C:', line)

				//lines.push(raw[i])
				var cmds = line.split(' ')
				var cmd = cmds[0].toUpperCase()
				var arg = cmds.slice(1)

				var func = COMMANDS[cmd]

				func
					?
					func.apply(socket, arg) :
					socket.send(502)
			}
		}
	}

	socket
		.on('data', onCommand)
		.on('end', function() {
			console.log('end', arguments)
		})
		.on('close', function() {
			console.log('close', arguments)
		})
		.on('timeout', function() {
			console.log('timeout', arguments)
		})
		.on('error', function(err) {
			console.log('error', arguments)
		})

}).on('error', function(err) {
	// handle errors here
	console.error(err)
})

//
ftpServer.listen({
	port: 8021
}, function() {
	console.log('opened server on', ftpServer.address())
})
