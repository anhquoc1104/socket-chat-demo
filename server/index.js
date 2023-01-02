const express = require('express')
const http = require("http")
const app = express()

const server = http.createServer(app)

const socketIO = require("socket.io")(server, {
	cors: {
		origin: "*",
	}
})


socketIO.on("connection", (socket) => { ///Handle khi có connect từ client tới
	console.log("New client connected" + socket.id);

	socket.emit("getId", socket.id) // Phát sự kiện trả về socketID cho client khi kết nối

	socket.on("sendDataClient", function (data) { // Lắng nghe sự kiện tên là sendDataClient từ phía client
		socketIO.emit("sendDataServer", { data }) // phát sự kiện có tên sendDataServer + data tới tất cả client đang connect
	})

	socket.on("disconnect", () => {
		console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
	});
});

server.listen(8000, () => {
	console.log('Server đang chay tren cong 8000')
})