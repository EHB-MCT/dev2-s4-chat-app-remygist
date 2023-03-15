"use strict";

const chat = {
    author: "B-lob",
    init() {
        this.fetchMessages();
        
    },
    sendMessage() {
        document.querySelector("#chatForm").addEventListener('submit', function (event) {
            event.preventDefault(); 
            let msgToSend = document.querySelector("#chatInput").value;
            let data = {
                author: chat.author,
                message: msgToSend
            }
            console.log(msgToSend);

            fetch('https://dev2chat.onrender.com/message',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            

        });
        this.fetchMessages();
    },
    fetchMessages() {
        document.querySelector('#messageContainer').innerHTML = "";

        fetch('https://dev2chat.onrender.com/messages').then(function (data) {
            return data.json()
                .then(function (messageJson) {
                    console.log(messageJson);
                    //document.querySelector('.messageItem').insertAdjacentHTML("beforeend",messageJson[0].message);
                    document.querySelector('#messageContainer').innerHTML = "";
                    messageJson.forEach(function (messageJson) {
                        const htmlMessage = `<div class="messageItem">
                        <div class="header">
                            <span class="author">${messageJson.author}</span>
                            <span class="time">${messageJson.created_at}</span>
                        </div>
                        <p>
                        ${messageJson.message}
                        </p>
                    </div>`
                    document.querySelector('#messageContainer').insertAdjacentHTML('beforeend', htmlMessage);
        console.log(messageJson.created_at);
                    });
                    
                })
        })
    },
    renderMessage(message) {
    }

}

chat.init();
chat.sendMessage();