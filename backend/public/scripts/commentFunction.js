checkStatus = async () => {
    const commentForm = document.getElementById('comment-form');
    const response = await fetch('http://localhost:3000/profile/status');
    if(await response.ok){
        responseObj = await response.json();
        if(responseObj.loggedIn == false){
            const textField = commentForm.children[0];
            textField.disabled = true;
            textField.value = 'Melden Sie sich um Kommentare zu schreiben'
            commentForm.children[1].disabled = true;
        }
        }else{
            console.log("Error while fetching!");
    }
}
checkStatus();