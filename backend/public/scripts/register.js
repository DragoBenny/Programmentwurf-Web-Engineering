document.getElementById("register-button").addEventListener("click", async function(e) {
    e.preventDefault();
    console.log("send request");
    const data = {
        username: document.getElementById("username-field").value,
        email: document.getElementById("email-field").value,
        password: document.getElementById("password-field").value,
        confirmedPassword: document.getElementById("confirmed-password-field").value
    }
    const response = await fetch('http://localhost:3000/profile/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if(response.ok){
        const html =  await response.text();
        document.open();
        document.write(html);
        document.close();
    }
});