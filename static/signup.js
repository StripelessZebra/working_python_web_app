$(document).ready(function(){
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
});

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    console.log(files);
    var imageHolder = document.getElementById('list');
    imageHolder.innerHTML = '';
    $('#hiddenImageToStore').text('');
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" style = "width:200px;height:200px; border: 1px solid black" src="', e.target.result,
                                '" title="', escape(theFile.name), '"/>'].join('');
            imageHolder.insertBefore(span, null);
            //console.log(e.target.result);
            $('#hiddenImageToStore').text(e.target.result);
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

function validateUsername(){
    var inputUserName = $('#inputName').val();

    if(inputUserName != ''){
        //Send a get request without refreshing page and a form
        var request = new XMLHttpRequest();
        request.onload = function() {
            // Receive the response
            if(request.responseText == "exists"){
                $('#inputName').css({ "border": '#FF0000 1px solid'});
                $('#validateNameMessage').text("Username is not available.");
                $('#submitBtn').attr("disabled", true);

            }
            else if(request.responseText == "does not exists"){
                $('#inputName').css({ "border": '#32CD32 1px solid'});
                $('#validateNameMessage').text("Username is available.");
                $('#submitBtn').attr("disabled", false);
            }
        };
        // We point the request at the appropriate command
        request.open("GET", "/check_username/" + inputUserName, true);
        // and then we send it off
        request.send();
    }
    else{
        $('#inputName').css({ "border": '#ccc 1px solid'});
        $('#validateNameMessage').text("");
    }

}