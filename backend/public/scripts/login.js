document.getElementById("login-button").addEventListener("click", async function(e) {
    e.preventDefault();
    const data = {
        emailUsername: document.getElementById("username-field").value,
        password: document.getElementById("password-field").value,
    }
    const response = await fetch('http://localhost:3000/profile/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if(response.ok){
        const html =  await response.text();
        document.open();
        document.write(html);
        document.close();
    }else{
        console.log("Error while fetching!");
    }
});