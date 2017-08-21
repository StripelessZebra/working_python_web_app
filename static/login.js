$(document).ready(function(){
    console.log($("#validation_message").text());

    if($("#validation_message").text() == "invalid"){
        $("#information_text").css('display', 'block');
        $("#information_text").prepend("<strong>Invalid Username or Password!</strong> Please try again.");
    }
    else if($("#validation_message").text() == "doesnotexist"){
        $("#information_text").css('display', 'block');
        $("#information_text").prepend("<strong>Invalid Username or Password!</strong> Please try again.");
    }
    else if($("#validation_message").text() == "created"){
        $("#information_text").css('display', 'block');
        $("#information_text").prepend("<strong>Your Account Has Been Created!</strong> Log in to begin using our services.");
    }
    else{
        $("#information_text").css('display', 'none');
    }
});