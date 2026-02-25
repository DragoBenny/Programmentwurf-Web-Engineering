checkStatus = async () => {
    const response = await fetch('/profile/status');
    if(await response.ok){
        responseObj = await response.json();
        if(responseObj.loggedIn == false){
            const textField = document.getElementById('comment-content');
            textField.disabled = true;
            textField.value = 'Melden Sie sich an um Kommentare zu schreiben'
            document.getElementById('comment-button').disabled = true;
        }
        }else{
            console.log("Error while fetching!");
    }
}

document.getElementById("comment-button").addEventListener("click", async function(e) {
    e.preventDefault();
    const urlData = window.location.href;
    const data = {
        content: document.getElementById('comment-content').value,
        trail_id: parseInt(urlData.split('/').filter(Boolean).pop())
    }
    const response = await fetch('/trails/comment', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    document.getElementById('comment-content').value = "";
});

checkStatus();
console.log(info);
console.log("Trail-ID", info.split('/').filter(Boolean).pop());