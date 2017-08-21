$(document).ready(function(){

    //var bookList = $("#list_of_books_holder").text();
    //$("#something").append(bookList);

    //After table has been filled, add boostrap's datatable logic to table on page load.
    $('#books_display_table').DataTable();

    //sessionStorage.clear();
    //localStorage.clear();
    //console.log(localStorage);
    //console.log(sessionStorage);

    var username = $("#name_of_user").text();
    //console.log(username);
    //console.log(localStorage.getItem("username"));
    if (typeof(Storage) !== "undefined") {
    //console.log("A");
        //Check if user details is stored in localStorage
        if(localStorage.getItem("username") == "" || localStorage.getItem("username") == null ){
            //No user detail in localStorage
            if(username != ""){
                //User has logged in but not stored in localStorage
                //console.log("2");
                // Store
                localStorage.setItem("username", username);
                $("#signup_button").css('display', 'none');
                $("#login_button").css('display', 'none');
                $("#user_profile").css('display', 'block');
            }
            //User has not logged in.
            else{
            //console.log("3");
                $("#signup_button").css('display', 'block');
                $("#login_button").css('display', 'block');
                $("#user_profile").css('display', 'none');
            }
        }
        //User details is stored in localStorage
        else{
                //console.log("1");
                $("#signup_button").css('display', 'none');
                $("#login_button").css('display', 'none');
                $("#user_profile").css('display', 'block');
                if(username == ""){
                    $("#welcome_span").append(" "+localStorage.getItem("username"));
                }

        }
    }
    else{
        alert("Sorry, your browser does not support Web Storage...");
    }

    $("#logout_button").click(function(){
        localStorage.clear();
        sessionStorage.clear();
        username = "";
        console.log("Logging out...");
    });

    $("#add_to_cart_btn").click(function(){
        alert("Function not done yet.");
    });

    if($('#profilepic').attr('src') == 'None' || $('#profilepic').attr('src') == '') {
        alert('No Profile Picture.');
        //$('#profilepic').css('display':'none');
    }
    else{
        //$('#profilepic').css('display':'block');
    }

});

function getBookDetailsBasedOnId(bookIdFromTable){
    //alert(bookIdFromTable);

    // Get the modal
    var modal = document.getElementById('myModal');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user selects, open the modal
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    //Send a get request without refreshing page and a form
    var request = new XMLHttpRequest();
    request.onload = function() {
        $("#modal_details").text('');
        // Receive the response
        //console.log(request.responseText);
        $("#modal_details").append(request.responseText);
    };
    // We point the request at the appropriate command
    request.open("GET", "/book_details/" + bookIdFromTable, true);
    // and then we send it off
    request.send();
    //location.href = "/book_details/" + bookIdFromTable;

}