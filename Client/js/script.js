$(document).ready(function(){
    $('#btn').click(function(){
        var mail = $('#userM').val();
        var password = $('#userP').val();
        $.ajax({
            url: '../Server/API/login.php',
            type: 'POST',
            success:function(data){
                if(data == true){
                    window.location.href = 'main-page.html';
                } else {
                    $('#infoError').html(data);
                }
            },
            error:function(err){
                // console.log(err.responseText);
                console.log('not ok');
            },
            data:{
                email:mail,
                pass:password
            }
        })
    });
    // $('tr').click(function () {
    //         console.log('ok');
    //     });
});