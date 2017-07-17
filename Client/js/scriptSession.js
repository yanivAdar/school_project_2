$(document).ready(function () {
    var stdData;
    var coursesArr = [];
    loadData();
    $('#mainSudentInfo').hide();
    $('#mainSudentEdit').hide();
    $.ajax({
        url: '../Server/API/login.php',
        success: function (data) {
            if (!data) {
                window.location.href = 'login.html';
            }
        },
        error: function (err) {
            console.log(err.responseText);
        }
    });
    $.ajax({
        url: '../Server/API/users.php',
        type: 'POST',
        success: function (data) {
            $('#name').html(data[1]);
            $('#role').html(data[2]);

            console.log(data);
            if (data[2] == 'Sales') {
                $('#adminBtn').hide();
            }
        },
        error: function (err) {
            console.log(err.responseText);
        }
    });
    $(document).on('click', '.strTR', function (e) {
        var id = $($(e.target).parent()).parent()[0].id;
        var std_id = getStudentFromData(id);
        currentStd(std_id);

    });
    $('#editStd').on('click', function () {
        $('#mainSudentInfo').hide();
        $('#updateStd').show();
        $('#createStd').hide();
        // var id = $('#editStd').attr('value');
        var id = $('#stdEmail').html();
        var std_id = getStudentFromData(id);
        getStudentInfoIntoForm(std_id);
    });
    $('#stdAdd').on('click', function () {
        $('#createStd').show();
        var checkboxVal = $('input:checkbox');
        $('#updateStd').hide();
        $('#mainSudentInfo').hide();
        $('#mainSudentEdit').effect('slide', 'fast');
        $('.clean').val('');
        $('#Picture').attr('src', '');
        for (let a of checkboxVal) {
            a['checked'] = false;
        }
    });
    $('#createStd').on('click', function () {
        var newStdUrl = '../Server/API/newStudent.php';
        var id = $('#Email').val();
        var name = $('#Name').val();
        var phone = $('#Phone').val();
        var email = $('#Email').val();
        var picture = $('#Picture').attr('src');
        var courses = fillCourses();
        newStdDetails(newStdUrl, id, name, phone, email, picture, courses);
    });
    $('#updateStd').on('click', function () {
        $('#updateStd').show();
        $('#createStd').hide();
        var updateUrl = '../Server/API/updateStudent.php';
        var id = $('#stdEmail').html();
        var name = $('#Name').val();
        var phone = $('#Phone').val();
        var email = $('#Email').val();
        var picture = $('#Picture').attr('src');
        var courses = fillCourses();
        newStdDetails(updateUrl, id, name, phone, email, picture, courses);
    });
    $('#deleteStd').click(function () {
        alert('you are about to delete this student');
        var doOrDont = confirm('are you sure you want to delete the student?');
        if (doOrDont) {
            var id = $('#stdEmail').html();
            $.ajax({
                url: '../Server/API/deleteStd.php',
                type: 'POST',
                success: function (data) {
                    $('.remove').remove();
                    loadData();
                },
                error: function (err) {
                    console.log(err.responseText);
                },
                data: {
                    id: id
                }
            });
        }
    });
    function loadData() {
        $.ajax({
            url: '../Server/API/students.php',
            type: 'POST',
            success: function (data) {
                stdData = data;
                for (let i of data) {
                    $('#Stable').append('<tr class="strTR remove" id="' + i[3] + '"><td class="info"><img class="proPic" src="' + i[4] + '"/></td><td><p class="info">' + i[1] + '</p><p class="info">' + i[2] + '</p></td></tr>');
                    // var courses = (i[6]).split(',');
                    var courses = (i[5]);
                    coursesArr.push(courses);
                }
            },
            error: function (err) {
                console.log(err.responseText);
            }
        });
    }
    function newStdDetails(url, id, name, phone, email, picture, courses) {
        $.ajax({
            url: url,
            type: 'POST',
            success: function (data) {
                $('.remove').remove();
                loadData();
                setTimeout(function () {
                    var std = getStudentFromData(email);
                    currentStd(std);
                }, 50);
            },
            error: function (err) {
                console.log(err.responseText);
            },
            data: {
                id:id,
                name: name,
                phone: phone,
                email: email,
                picture: picture,
                courses: courses
            }
        });
    }
    function getStudentFromData(id) {
        for (var i = 0; i < stdData.length; i++) {
            if (stdData[i][3] == id) {
                return stdData[i];
            }
        }
    }
    function currentStd(object) {
        $('#mainSudentEdit').hide();
        $('#mainSudentInfo').effect('slide', 'fast');
        $('#stdName').html(object[1]);
        $('#stdPhone').html(object[2]);
        $('#stdEmail').html(object[3]);
        $('#stdPic').attr('src', (object[4]));
        $('#stdCourses').html('');
        var stdCourses = object[5].split(",");
        // console.log(stdCourses);
        for (let j of stdCourses) {
            $('#stdCourses').append('<li>' + j + '</li>');
        }
    }
    function getStudentInfoIntoForm(object) {
        $('#mainSudentEdit').effect('slide', 'fast');
        $('#Name').val(object[1]);
        $('#Phone').val(object[2]);
        $('#Email').val(object[3]);
        $('#Picture').attr('src', (object[4]));
        var stdCourses = object[5].split(",");
        for (let a of $('input:checkbox')) {
            a['checked'] = false;
        }
        for (let i of $('input:checkbox'))
            for (let j of stdCourses) {
                if (i['value'] == j) {
                    i['checked'] = 'true';
                }
            }
    }
    function fillCourses() {
        var coursesArr = [];
        for (let i of $('input:checkbox')) {
            if (i['checked']) {
                coursesArr.push(i['value']);
            }
        }
        return coursesArr.toString();
    }
});