module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Join a specific group chat (room)
        socket.on('enterRoom', async ({ roomId, messageData }) => {
            const { username, eventId, timestamp } = messageData;

            // Join the user to the room
            socket.join(roomId);
            console.log(`User ${socket.id} joined room: ${roomId} as ${username}`);

            // System message for new user joining
            const systemMessage = {
                event_id: eventId,
                uname: "System",
                message: `User entered the event: ${username}`,
                type: "sys",
                timestamp,
            };

            // Save the message to the database
            await fetch(`${process.env.backendUri}/event/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(systemMessage),
            });

            // Broadcast the message only to users in the same room
            io.to(roomId).emit('newMessage', { roomId, messageData: systemMessage });
        });

        // Leave a group chat (room)
        socket.on('leaveRoom', (roomId) => {
            socket.leave(roomId);
            console.log(`User ${socket.id} left room: ${roomId}`);
        });

        // Handle message sending in a specific room
        socket.on('sendMessage', async ({ roomId, messageData }) => {
            const { uname, event_id, timestamp, message } = messageData;

            // Format the message data
            const userMessage = {
                event_id: event_id,
                uname: uname,
                message: message,
                type: "user",
                timestamp: timestamp,
            };

            console.log(`Message to room ${roomId}: ${userMessage.message}`);

            // Save the message to the database
            await fetch(`${process.env.backendUri}/event/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userMessage),
            });

            // Broadcast the message to the same room
            io.to(roomId).emit('newMessage', { roomId, messageData: userMessage });
        });

        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
