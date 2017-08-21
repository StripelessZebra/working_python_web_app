$(document).ready(function(){
    //console.log(localStorage);
    //console.log(sessionStorage);
    //console.log(localStorage.getItem("username"));
    if (typeof(Storage) !== "undefined") {
    //console.log("A");
        //Check if user details is stored in localStorage
        if(localStorage.getItem("username") == "" || localStorage.getItem("username") == null ){
            //No user detail in localStorage
            //console.log("3");
            $("#signup_button").css('display', 'block');
            $("#login_button").css('display', 'block');
            $("#user_profile").css('display', 'none');
            $("#book_display_button").css('display', 'none');
        }
        //User details is stored in localStorage
        else{
            //console.log("1");
            $("#signup_button").css('display', 'none');
            $("#login_button").css('display', 'none');
            $("#user_profile").css('display', 'block')
        }
    }
    else{
        alert("Sorry, your browser does not support Web Storage...");
    }

    $("#logout_button").click(function(){
        localStorage.clear();
        sessionStorage.clear();
        username = "";
        console.log("Logging out...")
    });
});