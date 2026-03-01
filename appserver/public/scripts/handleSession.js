checkStatus = async () => {
    const statusTag = document.getElementById('status');
    const response = await fetch('/profile/status');
    if(await response.ok){
        responseObj = await response.json();
        statusTag.innerHTML = await responseObj.username;
    }else{
        console.log("Error while fetching!");
    }
}

checkStatus();