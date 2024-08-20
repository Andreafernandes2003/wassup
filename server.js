// Import the Express module to create an HTTP server and handle routing
const express = require('express')
// Create an instance of an Express application
const app = express()
// Create an HTTP server using the Express app instance
const http = require('http').createServer(app)

// Define the port for the server to listen on, using an environment variable if available, otherwise default to 3000
const PORT = process.env.PORT || 3000

// Start the server and listen on the specified port
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// Serve static files (like CSS, images, and JavaScript) from the 'public' directory
app.use(express.static(__dirname + '/public'))

// Define a route to serve the main HTML file when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Import and initialize Socket.io for real-time communication using the HTTP server
const io = require('socket.io')(http)

// Listen for incoming socket connections
io.on('connection', (socket) => {
    console.log('Connected...')
    
    // Listen for 'message' events from the connected client
    socket.on('message', (msg) => {
        // Broadcast the received message to all other connected clients
        socket.broadcast.emit('message', msg)
    })
})
