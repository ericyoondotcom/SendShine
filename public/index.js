function sendMessage(){
    var msg = $("#input").val();
    $.get("/sendMessage/" + msg, function(){
        swal("Your vote has been cast!", "Thanks for making your opinion count!", "success");
        $("#in").val("");
        getData();
    });
}