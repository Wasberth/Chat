var socket = io.connect(window.location.hostname, { 'forceNew': true });

socket.on('messages', function(data) {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(elem => `
                        <div class="d-flex justify-content-start mb-4">
                            <div class="msg_cotainer">
                                ${elem.text}
                                <span class="msg_time">${elem.author}</span>
                            </div>
                        </div>`).join("");
    document.getElementById('messageCount').innerHTML = data.length + " mensajes";
    document.getElementById('messages').innerHTML = html;
}

function addMessage() {
    if (document.getElementById('texto').value != '') {
        var message = {
            author: document.getElementById('username').value,
            text: document.getElementById('texto').value
        };
        document.getElementById('texto').value = '';
        socket.emit('new-message', message);
    }
}