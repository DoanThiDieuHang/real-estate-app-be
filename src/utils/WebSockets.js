import webSocketsMessages from '../configs/webSocketsMessages.js';
class WebSockets {
    users = [];
    connection = client => {
        // event fired when the chat room is disconnected
        client.on(webSocketsMessages.disconnect, () => {
            client.disconnect();
            this.users = this.users.filter(user => user.id !== client.id);
        });
        // add identity of user mapped to the socket id
        client.on(webSocketsMessages.identity, userId => {
            this.users.push({
                socketId: client.id,
                userId: userId
            });
        });
        //subcribe seller and buyer to the chat room
        client.on(webSocketsMessages.subcribed, (room, buyerId) => {
            client.join(room);
            this.subcribeBuyer(room, buyerId);
            console.log('room joined: ', room);
        });
        // mute a chat room
        client.on(webSocketsMessages.unsubcribed, room => {
            client.leave(room);
        });
    };

    subcribeBuyer(room, buyerId) {
        const userSockets = this.users.filter(user => user.userId === buyerId);
        userSockets.forEach(userInfo => {
            const socketConn = global.io.sockets.sockets.get(userInfo.socketId);
            if (socketConn) {
                socketConn.join(room);
            }
        });
    }
}

export default WebSockets;
