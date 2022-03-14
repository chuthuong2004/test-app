const form = document.querySelector('.typing-area');
const inputField = form.querySelector('.input-field')
const sendBtn = form.querySelector('button');
const chatBox = document.querySelector('.chat-box');

form.onsubmit = (e) => {
    e.preventDefault();
}

sendBtn.onclick = () => {
    // let's start Ajax
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/insert-chat.php', true);
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                inputField.value = ""; // once message inserted into database then leave blank the the input field
                scrollToBottom();
            }
        }
    };
    // We have to send the form data through ajax to php
    let formData = new FormData(form); // creating new formData Object
    xhr.send(formData); // sending the formData to php
}

chatBox.onmouseenter = () => {
    chatBox.classList.add('active');
}
chatBox.onmouseleave = () => {
    chatBox.classList.remove('active');

}

setInterval(() => {
    // let's start Ajax
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/get-chat.php', true);
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                chatBox.innerHTML = data;
                if (!chatBox.classList.contains('active')) {
                    scrollToBottom();
                }
            }
        }
    };
    // We have to send the form data through ajax to php
    let formData = new FormData(form); // creating new formData Object
    xhr.send(formData); // sending the formData to php
}, 500); // this function will run frequently after 5s


function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}