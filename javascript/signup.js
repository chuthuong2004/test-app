const form = document.querySelector('.signup form')
const continueBtn = form.querySelector('.button input')
const errorText = form.querySelector('.error-txt');
form.onsubmit = (e) => {
    e.preventDefault();
}
continueBtn.onclick = () => {
    // let's start Ajax
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/signup.php', true);
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                if (data == "success") {
                    location.href = "index.php";
                } else {
                    errorText.textContent = data;
                    errorText.style.display = "block";
                }
            }
        }
    };
    // We have to send the form data through ajax to php
    let formData = new FormData(form); // creating new formData Object
    xhr.send(formData); // sending the formData to php
}