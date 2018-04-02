let clients = {};

module.exports = server => {
    const io = require('socket.io')(server);

    io.on('connection', client => {
        const clientData = {
            id: client.id,
            username: client.handshake.headers.username
        };
        console.log('Пользователь %s вошел в чат. Общее количество пользователей в чате: %s', client.handshake.headers.username, Object.keys(clients).length + 1);

        // Новый пользователь
        client.broadcast.emit('new user', clientData);

        clients[client.id] = clientData;
        client.emit('all users', clients);

        // Отправка сообщения
        client.on('chat message', (msg, targetClientId) => {
            console.log('Сообщение: ', msg, 'ID пользователя: ', targetClientId);
            console.log('ID пользователя - %s', client.id);
            client.broadcast
                .to(targetClientId)
                .emit('chat message', msg, client.id);
        });

        // Отключение пользователя
        client.on('disconnect', () => {
            delete clients[client.id];

            client.broadcast.emit('delete user', client.id);

            console.log('Пользователь %s покинул чат. Общее количество пользователей в чате: %s', client.handshake.headers.username, Object.keys(clients).length);
        });
    });
};