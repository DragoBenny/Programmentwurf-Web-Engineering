document.getElementById("register-button").addEventListener("submit", function(e) {
    var object = new Object();
    object.email = document.getElementById("email-field").value;
    object.username = document.getElementById("username-field").value;
    object.password = document.getElementById("password-field").value;
    object.confirmedPassword = document.getElementById("confirmed-password-field").value;
    fetch('http://localhost:3000/backend/profile/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    })
});