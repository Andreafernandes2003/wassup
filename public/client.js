// Initialize a socket connection to the server using Socket.io
const socket = io()

// Declare a variable to store the user's name
let name;

// Get references to the textarea where the user types messages, and the area where messages are displayed
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

// Prompt the user to enter their name and keep prompting until a valid name is provided
do {
    name = prompt('Please enter your name: ')
} while(!name)

// Add an event listener to the textarea to detect when the 'Enter' key is pressed
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        // If 'Enter' is pressed, send the message
        sendMessage(e.target.value)
    }
})

// Function to send a message
function sendMessage(message) {
    // Create a message object with the user's name and the trimmed message content
    let msg = {
        user: name,
        message: message.trim()
    }
    
    // Append the message to the message area as an outgoing message
    appendMessage(msg, 'outgoing')
    
    // Clear the textarea after sending the message
    textarea.value = ''
    
    // Scroll to the bottom of the message area to show the latest message
    scrollToBottom()

    // Send the message to the server using Socket.io
    socket.emit('message', msg)
}

// Function to append a message to the message area
function appendMessage(msg, type) {
    // Create a new div element to contain the message
    let mainDiv = document.createElement('div')
    
    // Add classes to style the message (outgoing or incoming, and general message class)
    let className = type
    mainDiv.classList.add(className, 'message')

    // Create the HTML structure for the message, including the user's name and message content
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    
    // Set the inner HTML of the message div
    mainDiv.innerHTML = markup
    
    // Append the message div to the message area in the DOM
    messageArea.appendChild(mainDiv)
}

// Listen for incoming messages from the server
socket.on('message', (msg) => {
    // Append incoming messages to the message area
    appendMessage(msg, 'incoming')
    
    // Scroll to the bottom of the message area to show the latest message
    scrollToBottom()
})

// Function to scroll to the bottom of the message area
function scrollToBottom() {
    // Set the scroll position to the height of the message area, ensuring the latest message is visible
    messageArea.scrollTop = messageArea.scrollHeight
}
