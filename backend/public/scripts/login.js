document.getElementById("login-button").addEventListener("submit", function(e) {
    let object = new Object();
    object.username = document.getElementById("username-field").value;
    object.password = document.getElementById("password-field").value;
    let data = fetch('http://localhost:3000/backend/profile/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    })
    console.log(data);
});