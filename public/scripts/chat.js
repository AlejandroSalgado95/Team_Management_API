
var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiYWFsZW1hbiIsImlhdCI6MTU5Mjk3NDg4MiwiZXhwIjoxNTkyOTc4NDgyfQ.VQluUHH1HZWfUQNUbIc8QwKkrQbvLaOChpuZ8NCTq6k";
const socket = io.connect('https://team-management-api.herokuapp.com/');
socket.on('connect', () => {
  console.log("working on this");
  socket
    .emit('authenticate', { token: jwt }) //send the jwt
    .on('authenticated', () => {
      console.log("yes im there");

		socket.on('message', (message) => {
		    console.log(message)
		})

		socket.emit('sendMessage', "aye everyone how's everybody", (error) => {
	
	        if (error) {
	            return console.log(error)
	        }

	        console.log('Message delivered!')
    	})

    })
    .on('unauthorized', (msg) => {
      console.log("unauthorized:" + JSON.stringify(msg.data));
      throw new Error(msg.data.type);
    })
});

