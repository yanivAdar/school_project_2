$(document).ready(function () {
    var stdData;
    var crsData;
    var coursesArr = [];
    var studentCrsArr = [];
    loadDataStd();
    loadDataCrs();
    var gId;
    $('#mainSudentInfo').hide();
    $('#mainSudentEdit').hide();
    $('#mainCoursesInfo').hide();
    $('#mainCourseEdit').hide();
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
    $(document).on('click', '.crsTR', function (e) {
        id = this.id;
        gId = id;
        var crsObj = getCoursesFromData(id);
        currentCrs(crsObj);
    })
    $(document).on('click', '.stdTR', function (e) {
        var id = $($(e.target).parent()).parent()[0].id;
        var std_id = getStudentFromData(id);
        currentStd(std_id);
    });
    $('#editStd').on('click', function () {
        $('#mainSudentInfo').hide();
        $('#updateStd').show();
        $('#createStd').hide();
        var id = $('#stdEmail').html();
        var std_id = getStudentFromData(id);
        getStudentInfoIntoForm(std_id);
    });
    $('#editCrs').on('click', function () {
        $('#mainCoursesInfo').hide();
        $('#updateCrs').show();
        $('#createCrs').hide();
        var crsObj = getCoursesFromData(id);
        getCoursesInfoIntoForm(crsObj);
    });
    $('#stdAdd').on('click', function () {
        $('#createStd').show();
        var checkboxVal = $('input:checkbox');
        $('#mainCoursesInfo').hide();
        $('#mainCourseEdit').hide();
        $('#updateStd').hide();
        $('#mainSudentInfo').hide();
        $('#mainSudentEdit').effect('slide', 'fast');
        $('.clean').val('');
        $('#Picture').attr('src', '');
        for (let a of checkboxVal) {
            a['checked'] = false;
        }
    });
    $('#crsAdd').on('click', function () { // here-------------------------------------------------
        $('#createCrs').show();
        $('#mainSudentEdit').hide();
        $('#mainSudentInfo').hide();
        $('#mainCoursesInfo').hide();
        $('#updateCrs').hide();
        $('#mainCourseEdit').effect('slide', 'fast');
        $('.clean').val('');
        $('#Picture').attr('src', '');
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
    $('#createCrs').on('click', function () {
        var newStdUrl = '../Server/API/newCourses.php';
        var name = $('#crsNameEdit').val();
        var description = $('#crsDescription').val();
        var picture = $('#crsPicture').attr('src');
        newCrsDetails(newStdUrl, name, description, picture);
    });
    // $('#updateCrs').on('click', function () {
    //     $('#updateStd').show();
    //     $('#createStd').hide();
    //     var updateUrl = '../Server/API/updateStudent.php';
    //     var id = $('#stdEmail').html();
    //     var name = $('#Name').val();
    //     var phone = $('#Phone').val();
    //     var email = $('#Email').val();
    //     var picture = $('#Picture').attr('src');
    //     var courses = fillCourses();
    //     newStdDetails(updateUrl, id, name, phone, email, picture, courses);
    // });
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
                    loadDataStd();
                    loadDataCrs();
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
    $('#deleteCrs').click(function () {
        alert('you are about to delete this course');
        var doOrDont = confirm('are you sure you want to delete the course?');
        if (doOrDont) {
            var numberId = Number(id.replace( /^\D+/g, ''));
            $.ajax({
                url: '../Server/API/deleteCrs.php',
                type: 'POST',
                success: function (data) {
                    $('.remove').remove();
                    loadDataStd();
                    loadDataCrs();
                },
                error: function (err) {
                    console.log(err.responseText);
                },
                data: {
                    id: numberId
                }
            });
        }
    });
    function loadDataStd() {
        $.ajax({
            url: '../Server/API/students.php',
            type: 'POST',
            success: function (data) {
                stdData = data;
                for (let i of data) {
                    $('#Stable').append('<tr class="stdTR remove" id="' + i[3] + '"><td class="info"><img class="proPic" src="' + i[4] + '"/></td><td><p class="info">' + i[1] + '</p><p class="info">' + i[2] + '</p></td></tr>');
                    var courses = (i[5]);
                    coursesArr.push(courses);
                }
            },
            error: function (err) {
                console.log(err.responseText);
            }
        });
    }
    function loadDataCrs() {
        $.ajax({
            url: '../Server/API/courses.php',
            type: 'POST',
            success: function (data) {
                crsData = data;
                for (let i of data) {
                    $('#Ctable').append('<tr class="crsTR remove" id="crs.' + i[0] + '"><td class="info"><img class="proPic" src="' + i[3] + '"/></td><td><p class="info">' + i[1] + '</p><p></P></td></tr>');
                    // var courses = (i[6]).split(',');
                    var studentCourses = (i[4]);
                    studentCrsArr.push(studentCourses);
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
                loadDataStd();
                loadDataCrs();
                setTimeout(function () {
                    var std = getStudentFromData(email);
                    currentStd(std);
                }, 50);
            },
            error: function (err) {
                console.log(err.responseText);
            },
            data: {
                id: id,
                name: name,
                phone: phone,
                email: email,
                picture: picture,
                courses: courses
            }
        });
    }
    function newCrsDetails(url, name, des, picture, students) {
        $.ajax({
            url: url,
            type: 'POST',
            success: function (data) {
                $('.remove').remove();
                loadDataCrs();
                loadDataStd();
                setTimeout(function () {
                    var crs = getCoursesFromData('crs.'+data);
                    currentCrs(crs);
                }, 50);
            },
            error: function (err) {
                console.log(err.responseText);
            },
            data: {
                name: name,
                des: des,
                // picture: picture,
                // students: students
            }
        });
    }
    // function updateStudentsCourses() {
    //     $.ajax({
    //         url: '../Server/API/coursesUpdate.php',
    //         type: 'POST',
    //         success: function (data) {

    //         },
    //         error: function (err) {
    //             console.log(err.responseText);
    //         },
    //         data: {
    //             stdArr = updateStudentListInCourses()
    //         }
    //     });
    // }
    function getStudentFromData(id) {
        for (var i = 0; i < stdData.length; i++) {
            if (stdData[i][3] == id) {
                return stdData[i];
            }
        }
    }
    function getCoursesFromData(id) {
        for (var i = 0; i < crsData.length; i++) {
            if ('crs.' + crsData[i][0] == id) {
                return crsData[i];
            }
        }
    }
    function currentStd(object) {
        $('#mainCoursesInfo').hide();
        $('#mainCourseEdit').hide();
        $('#mainSudentEdit').hide();
        $('#mainSudentInfo').effect('slide', 'fast');
        $('#stdName').html(object[1]);
        $('#stdPhone').html(object[2]);
        $('#stdEmail').html(object[3]);
        $('.stdPic').attr('src', (object[4]));
        $('#stdCourses').html('');
        var stdCourses = object[5].split(",");
        for (let j of stdCourses) {
            $('#stdCourses').append('<li>' + j + '</li>');
        }
    }
    function currentCrs(object) {
        $('#mainSudentEdit').hide();
        $('#mainCourseEdit').hide();
        $('#mainSudentInfo').hide();
        $('#mainCoursesInfo').effect('slide', 'fast');
        $('#crsName').html(object[1]);
        $('#crsDesc').html(object[2]);
        $('.crsPic').attr('src', (object[3]));
        $('.removeCrs').remove();
        var stdEnrolled = updateStudentListInCourses(object[1]);
        for (let j of stdEnrolled) {
            for (let i of stdData) {
                if (j == i[3]) {
                    $('#stdEnrolled').append('<tr class="removeCrs" id="' + i[3] + '"><td class="info"><img class="proPic" src="' + i[4] + '"/></td><td><p class="info">' + i[1] + '</p><p class="info">' + i[2] + '</p></td></tr>');
                }
            }
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
    function getCoursesInfoIntoForm(object) {
        $('#mainCourseEdit').effect('slide', 'fast');
        $('#crsNameEdit').val(object[1]);
        $('#crsDescription').val(object[2]);
        $('#crsPicture').attr('src', (object[3]));
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
    function updateStudentListInCourses(crs) {
        stdEnrolled = [];
        for (let j of stdData) {
            var crsArr = j[5].split(",");
            for (let k of crsArr) {
                if (crs == k) {
                    stdEnrolled.push(j[3]);
                }
            }
        }
        return stdEnrolled;
    }
    function updateCoursesListInStudents() {

    }
});