reloadData();

function sendMessage(){
    var msg = $("#input").val();
    $.get("/sendMessage/" + msg, function(res){
        var sentiment = res.sentiment;
        console.log(sentiment);
        if(sentiment <= -0.5){
            alert("Whoops! Your post was deemed negative. Edit it so it would make other people HAPPY!");
        }else{
            reloadData();
            $("#input").val("");
        }
    });

}
function reloadData(){
    $("#messages").empty();
    $.get("/getMessages/", function(response){
        console.log(response);
        for(var message of response){
            var $newmsg = $('<div class="card" style="padding: 5px;">' + message + "</div>");
            
            $("#messages").append($newmsg);
            
        }
    });
}
function clearPosts(){
    $.get("/clearMessages/", function(){reloadData();});
    
}