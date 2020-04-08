window.onload = function() {
    //Get references to elements on the page
    let form = document.getElementById('message-form')
    let messageField = document.getElementById('message')
    let messagesList = document.getElementById('messages')
    let socketStatus = document.getElementById('status')
    let closeBtn = document.getElementById('close')

    //Create a new WebSocket
    let socket = new WebSocket('ws://echo.websocket.org')

    //Show a connected message when the WebSocket is opened
    socket.onopen = function(event) {
        socketStatus.innerHTML = 'Connected to:' + event.currentTarget.url
        socketStatus.className = 'open'
    }

    //Handle any errors that occur
    socket.onerror = function(error) {
        console.log('WebSocket Error: ' + error )
    }

    //Send message on form submission
    form.onsubmit = function(event) {
        event.preventDefault()

        //Retrieve message from the textarea
        let message = messageField.value

        //Send the message to the messages list
        messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + ' ' + message + '</li>'

        //Clear out the message field
        messageField.value = ''

        return false
    }

    //Handle messages sent by the server
    socket.onmessage = function(event) {
        let message = event.data
        messagesList.innerHTML += '<li class="received"><span>Received:</span>' + message + '</li>'
    }

    //Show a disconnected message when the WebSocket is closed
    socket.onclose = function(event) {
        socketStatus.innerHTML = 'Disconnected from WebSocket.'
        socketStatus.className = 'closed'
    }

    //Close the WebSocket connection when the close button is clicked
    closeBtn.onclick = function(event) {
        event.preventDefault()

        //Close the WebSocket
        socket.close()

        return false
    }
}