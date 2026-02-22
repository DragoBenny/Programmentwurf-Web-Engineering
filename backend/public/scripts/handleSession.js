checkStatus = async () => {
    const statusTag = document.getElementById('status');
    const response = await fetch('http://localhost:3000/profile/status');
    if(await response.ok){
        responseObj = await response.json();
        statusTag.innerHTML = await responseObj.username;
    }else{
        console.log("Error while fetching!");
    }
}

checkStatus();