checkStatus = async () => {
    const response = await fetch('http://localhost:3000/profile/status');
    if(await response.ok){
        responseObj = await response.json();
        if(responseObj.loggedIn == false){
            const textField = document.getElementById('comment-content');
            textField.disabled = true;
            textField.value = 'Melden Sie sich um Kommentare zu schreiben'
            document.getElementById('comment-button').disabled = true;
        }
        }else{
            console.log("Error while fetching!");
    }
}

document.getElementById("comment-button").addEventListener("click", async function(e) {
    e.preventDefault();
    const data = {
        content: document.getElementById('comment-content').value
    }
    const response = await fetch('http://localhost:3000/trails', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
});


checkStatus();