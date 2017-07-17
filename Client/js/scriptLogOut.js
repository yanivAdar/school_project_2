$(document).ready(function(){
    $('#logout').click(function(){
        $.ajax({
            url:  '../Server/API/logout.php',
            success:function(){
                    window.location.href = 'login.html';   
            },
            error:function(err){
                console.log(err.responseText);
            }
        });
    });
});