// Function to get query parameter by name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the username from the URL and display it
const username = getQueryParam('uname');
console.log("uname",username)
document.getElementById('username').textContent = username ? username : 'Guest';

// Logout function to redirect to the login page
function logout() {
    window.location.href = 'login';  // Redirect back to the login page
}

// Function to search for events
async function searchEvent() {
    const eventId = document.getElementById('event_id').value;

    let apiUriResponse = await fetch('api/config')
    apiUriResponse=await apiUriResponse.json()
    const apiUri=apiUriResponse.apiUri;
    
    fetch(apiUri+'/backend/event/getAnEvent?eventid=' + eventId)
        .then(response => response.json())
        .then(data => {
            displayEvents(data);
        })
        .catch(error => {
            console.error('Error fetching event:', error);
        });
}

// Function to display events
function displayEvents(events) {
    const eventsContainer = document.getElementById('events');
    eventsContainer.innerHTML = ''; // Clear previous events

    if (!events || events.length === 0) {
        eventsContainer.innerHTML = '<p>No events found</p>';
        return;
    }

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Description:</strong> ${event.desc}</p>
            <p><strong>Hosted By:</strong> ${event.hosted_by}</p>
            <p><strong>Type:</strong> ${event.type || 'N/A'}</p>
            <p><strong>Event ID:</strong> ${event.event_id}</p>
            <p><strong>Event Passcode:</strong> ${event.event_passcode || 'N/A'}</p>
            <button class="join-event-button" onClick="joinEvent('${event.event_id}','${username}')">Join Event</button>
            <button class="join-event-button" onClick="goToEvent('${event.event_id}','${username}')">Go To Event</button>
        `;
        eventsContainer.appendChild(eventCard);
    });
}

function goToEvent(eventId, username) {
    // Construct the URL for the chat window
    const chatUrl = `eventChat?event_id=${eventId}&uname=${username}`;
    // Redirect to the chat window
    window.location.href = chatUrl;
}

// Define the joinEvent function
async function joinEvent(event_id,uname) {
    try {
        const joinEventData = { uname: uname, event_id: event_id }
        apiUri=await FetchApi()
        const response = await fetch(apiUri+`/backend/event/joinAnEvent`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(joinEventData), // Send event ID in body if necessary
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        alert(data.message);
        // Optionally update UI or show success message
    } catch (error) {
        console.error('Error joining event:', error);
        // Optionally show error message to user
    }
}

// Function to navigate to create event page
function createDebateEvent() {
    console.log("Hello")
    window.location.href = `createEvent?uname=${username}`;  // Navigate to create event page
}


async function FetchApi(){
    let apiUriResponse = await fetch('api/config')
    apiUriResponse=await apiUriResponse.json()
    const apiUri=apiUriResponse.apiUri;
    return apiUri
}
// Fetch and display initial events from the API
async function fetchAllEvents(){
    apiUri=await FetchApi()
    fetch(apiUri+'/backend/event/getAllUserAndPublicEvents?uname='+username)
        .then(response => response.json())
        .then(data => {
            displayEvents(data);
        })
        .catch(error => {
            console.error('Error fetching initial events:', error);
        });
}
fetchAllEvents()
