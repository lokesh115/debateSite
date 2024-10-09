// Function to get query parameter by name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the username from the URL and display it
const username = getQueryParam('uname');
document.getElementById('username').textContent = username ? username : 'Guest';

// Logout function to redirect to the login page
function logout() {
    window.location.href = 'login';  // Redirect back to the login page
}

// Function to search for events
function searchEvent() {
    const eventId = document.getElementById('event_id').value;
    
    fetch('http://localhost:7878/eventService/getAnEvent?eventid=' + eventId)
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
    console.log(events)
    if (events==null || events=={}) {
        eventsContainer.innerHTML = '<p>'+events.message+'</p>';
        return;
    }

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <h3>${event.eventname}</h3>
            <p>Event ID: ${event.event_id}</p>
            <!-- Add more event details here -->
        `;
        eventsContainer.appendChild(eventCard);
    });
}

// Function to navigate to create event page
function createEvent() {
    window.location.href = 'create_event.html';  // Navigate to create event page
}

// Fetch and display initial events from the API
fetch('http://localhost:7878/eventService/getAllEvents')
    .then(response => response.json())
    .then(data => {
        displayEvents(data);
    })
    .catch(error => {
        console.error('Error fetching initial events:', error);
    });
