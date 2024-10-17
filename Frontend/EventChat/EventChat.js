// Get the event ID and username from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('event_id');
const username = urlParams.get('uname');

let apiUri, eventData, socket, currentRoom;

(async () => {
    try {
        // Fetch API URI
        apiUri = await FetchApi();
        
        // Fetch event details
        eventData = await FetchEventDetails(apiUri);
        
        // Set the event title
        document.getElementById('event-title').innerText = `Event Title: ${eventData.title}`;
    } catch (err) {
        console.log(err.message);
        return; // Stop further execution if fetching fails
    }

    try {
        // Initialize the socket connection
        socket = io(apiUri, {
            transports: ['websocket', 'polling'], // Ensure both transports are supported
        });

        console.log("Socket URI:", apiUri);
        currentRoom = eventId; // Set the current room to the event ID
        const timestamp = new Date(); // Get current timestamp
        
        // Emit event to join the room
        socket.emit('enterRoom', { roomId: currentRoom, messageData: { username, eventId, timestamp } });
        console.log(`Joined room: ${currentRoom}`);
    } catch (err) {
        console.log("Socket error", err.message);
        return; // Stop further execution if socket connection fails
    }

    try {
        // Load transcript from database
        const transcript = eventData.transcript;
        console.log(JSON.stringify(transcript));
        
        // Display each message in the transcript
        transcript.forEach(msgData => {
            const item = document.createElement('li');
            const sender = msgData.type === "sys" ? "System" : msgData.uname;
            item.textContent = `${sender}: ${msgData.message} (Timestamp: ${msgData.timestamp})`;
            document.getElementById('messages').appendChild(item);
        });

        // Receive new messages for the current room
        socket.on('newMessage', ({ roomId, messageData }) => {
            console.log("New message received:", JSON.stringify(messageData));
            const item = document.createElement('li');
            item.textContent = `${messageData.uname}: ${messageData.message} (Timestamp: ${messageData.timestamp})`;
            document.getElementById('messages').appendChild(item);
        });
    } catch (err) {
        console.log("Socket listening error", err.message);
    }
})();

// Fetch API URI
async function FetchApi() {
    try {
        const apiUriResponse = await fetch('api/config');
        const { apiUri } = await apiUriResponse.json();
        return apiUri;
    } catch (error) {
        console.error('Error fetching API URI:', error);
    }
}

// Fetch event details
async function FetchEventDetails(apiUri) {
    try {
        const response = await fetch(`${apiUri}/backend/event/getAllEventDetails?event_id=${eventId}`);
        return await response.json(); // Ensure you await the response
    } catch (error) {
        console.error('Error fetching event details:', error);
    }
}

// Function to fetch members
async function fetchMembers(eventData) {
    try {
        const members = eventData.members;
        alert(`Members: ${members.join(', ')}`);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

// Add event listener to the Members button
document.getElementById('members-button').addEventListener('click', async () => {
    await fetchMembers(eventData);
});

// Function to send a message
async function sendMessage(currentRoom, socket) {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim(); // Trim whitespace

    if (!message) {
        return; // Don't send empty messages
    }

    const messageData = {
        event_id: eventId,
        uname: username,
        message: message,
        timestamp: new Date().toISOString() // Use ISO string for consistency
    };

    try {
        socket.emit('sendMessage', { roomId: currentRoom, messageData });
        messageInput.value = ''; // Clear input after sending
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Add event listener to the Send button
document.getElementById('send-button').addEventListener('click', () => {
    sendMessage(currentRoom, socket);
});

// Allow pressing Enter to send a message
document.getElementById('message-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage(currentRoom, socket);
    }
});
