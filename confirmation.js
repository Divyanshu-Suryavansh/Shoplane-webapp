var responseVal = localStorage.getItem("response-message");
if(responseVal === "success")
{
    $('#success-wrapper').css({"display":"block"});
}
else if(responseVal === "failure")
{
    $('#failure-wrapper').css({"display":"block"});
}

document.getElementById('home-redirect').onclick = function(){
  location.assign('./index.html');
}