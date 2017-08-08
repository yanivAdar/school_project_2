$(document).ready(function () {
    // -----------------------------------GLOBAL AJAX AND FUNCTIONS --------------------------
    var stdData;
    var crsData;
    var adminData;
    var adminLoged;
    var coursesArr = [];
    var studentCrsArr = [];

    var gId;
    $('#mainInfo').show();
    $('#mainAdminInfo').hide();
    $('#mainSudentInfo').hide();
    $('#mainSudentEdit').hide();
    $('#mainCoursesInfo').hide();
    $('#mainCourseEdit').hide();
    $('#mainAdminsInfo').hide();
    $('#mainAdminsEdit').hide();
    $('#mainAdminsList').hide();
    $('#schoolBtn').on('click', function () {
        $('#mainInfo').effect('slide', 'fast');
        $('#mainAdminInfo').hide();
        $('#mainSudentInfo').hide();
        $('#mainSudentEdit').hide();
        $('#mainCoursesInfo').hide();
        $('#mainCourseEdit').hide();
        $('#mainAdminsInfo').hide();
        $('#mainAdminsEdit').hide();
        $('#mainAdminsList').hide();
        $('#mainCoursesList').show();
        $('#mainStudentsList').show();
        loadDataStd();
        loadDataCrs();
    });

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
            adminLoged = data;
            $('#name').html(data[1]);
            $('#role').html(data[2]);
            $('#adminImg').attr('src', data[5]);

            console.log(data);
            if (data[2] == 'Sales') {
                $('#adminBtn').hide();
                $('#crsAdd').hide();
                $('#editCrs').hide();
            }

        },
        error: function (err) {
            console.log(err.responseText);
        }
    });

    function uploadImage(idOfBtn, idOfPic, locationClient, picFolder) {
        var file_data = $('#' + idOfBtn).prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('locationClient', locationClient);
        $.ajax({
            url: '../Server/API/uploadPic.php',
            type: 'POST',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function (data) {
                console.log(data);
                $('#' + idOfPic).attr('src', picFolder + data);
            },
            error: function (err) {
                console.log(err.responseText);
            }
        });
    }
    function getNumberOf(data, id) {
        $('#' + id).html(data.length);
    }
    function checkEmail(table, emailPos, obj, vId, xId, errMsgId) {
        $(obj).css('background-color', 'white');
        $(errMsgId).html('');
        var resFlag = true;
        var isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(obj.value);
        $(vId).hide();
        $(xId).hide();
        if (isEmail) {
            var emailCon = {
                email: obj.value,
                table: table,
                pos: emailPos
            }
            $.post('../Server/API/checkIfEmail.php', emailCon, function (data) {
                if (data) {
                    $(xId).fadeIn('fast');
                    $(obj).css('background-color', '#faadad');
                    $(errMsgId).html("*email already exists");
                    resFlag = false;
                    return resFlag;
                } else {
                    $(vId).fadeIn('fast');
                }
            });
        } else {
            $(xId).fadeIn('fast');
            $(obj).css('background-color', '#faadad');
            $(errMsgId).html("*not a valid email");
            resFlag = false;
        }
        return resFlag;
    }
    setTimeout(function () {
        loadDataAdmin();
        loadDataStd();
        loadDataCrs();
    }, 100);
    $body = $("body");
    $(document).on({
        ajaxStart: function () { $body.addClass("loading"); },
        ajaxStop: function () { $body.removeClass("loading"); }
    });
    // ----------------------------------- ADMINS FUNCTIONS ----------------------------------
    $(document).on('click', '.adminTR', function () {
        id = this.id;
        var adminObj = getAdminFromData(id);
        currentAdmin(adminObj);

    });
    $('#adminBtn').on('click', function () {
        $('#mainInfo').hide();
        $('#mainSudentInfo').hide();
        $('#mainSudentEdit').hide();
        $('#mainCoursesInfo').hide();
        $('#mainCourseEdit').hide();
        $('#mainCoursesList').hide();
        $('#mainStudentsList').hide();
        $('#mainAdminInfo').effect('slide', 'fast');
        $('#mainAdminsInfo').hide();
        $('#mainAdminsList').show();
        $('#mainAdminsEdit').hide();
        loadDataAdmin();
    });
    $('#editAdmin').on('click', function () {
        $('#adminEditEmail').css('background-color', 'white');
        $('#errMsg').html('');
        $('#adminSigns').empty();
        $('#adminSigns').append('<img id="vSign" class="goodOrBad" src="project-pics/vSign.png" /><img id="xSign" class="goodOrBad" src="project-pics/xSign.png" />');
        $('#vSign').hide();
        $('#xSign').hide();
        $('#adminEditRole').removeAttr('disabled');
        $('#deleteAdmin').show();
        if (adminLoged[2] == 'manager') {
            if (Number(id.replace(/^\D+/g, '')) == adminLoged[0]) {
                $('#adminEditRole').attr('disabled', 'true');
                $('#deleteAdmin').hide();
            }
        }
        $('#mainInfo').hide();
        $('#mainAdminsInfo').hide();
        $('#mainAdminInfo').hide();
        $('#updateAdmin').show();
        $('#createAdmin').hide();
        var adminObj = getAdminFromData(id);
        getAdminInfoIntoForm(adminObj);
        $('#adminEditEmail').on('blur', function (e) {
            if (checkEmail('admins', 'admin_email', this, '#vSign', '#xSign', '#errMsg')) {
                $('#updateAdmin').removeAttr('disabled');
            } else {
                $('#updateAdmin').attr('disabled', 'true');
            }
        });
    });
    $('#updateAdmin').on('click', function () {

        var updateAdminUrl = '../Server/API/updateAdmin.php';
        var idNum = Number(id.replace(/^\D+/g, ''));
        var name = $('#adminEditName').val();
        var phone = $('#adminEditPhone').val();
        var email = $('#adminEditEmail').val();
        var picture = $('#adminEditPicture').attr('src');
        var role = $('#adminEditRole').val();
        var pass = $('#adminPass').val();
        var conPass = $('#adminConPass').val();
        newAdminDetails(updateAdminUrl, idNum, name, phone, email, picture, role, pass, conPass);
    });
    $('#adminAdd').on('click', function () {
        $('#adminEditEmail').css('background-color', 'white');
        $('#errMsg').html('');
        $('#adminSigns').empty();
        $('#adminSigns').append('<img id="vSign" class="goodOrBad" src="project-pics/vSign.png" /><img id="xSign" class="goodOrBad" src="project-pics/xSign.png" />');
        $('#vSign').hide();
        $('#xSign').hide();
        $('#mainInfo').hide();
        $('#mainAdminInfo').hide();
        $('#mainAdminsInfo').hide();
        $('#mainAdminsEdit').effect('slide', 'fast');
        $('#createAdmin').show();
        $('#createAdmin').attr('disabled', 'true');
        $('#updateAdmin').hide();
        $('#deleteAdmin').hide();
        $('#myUploadAdminfile').val('');
        $('.clean').val('');
        $('#adminEditPicture').attr('src', '');
        $('#adminEditEmail').on('blur', function (e) {
            if (checkEmail('admins', 'admin_email', this, '#vSign', '#xSign', '#errMsg')) {
                $('#createAdmin').removeAttr('disabled');
            } else {
                $('#createAdmin').attr('disabled', 'true');
            }
        });
    });
    $('#createAdmin').on('click', function () {
        var newAdminUrl = '../Server/API/newAdmin.php';
        var id = id;
        var name = $('#adminEditName').val();
        var phone = $('#adminEditPhone').val();
        var email = $('#adminEditEmail').val();
        var picture = $('#adminEditPicture').attr('src');
        var role = $('#adminEditRole').val();
        var pass = $('#adminPass').val();
        var conPass = $('#adminConPass').val();
        newAdminDetails(newAdminUrl, id, name, phone, email, picture, role, pass, conPass);
    });
    $('#myAdminUpload').on('click', function () {
        uploadImage('myUploadAdminfile', 'adminEditPicture', '../../client/project-pics/profile-pictures/', 'project-pics/profile-pictures/');
    });
    $('#deleteAdmin').click(function () {
        alert('you are about to delete this admin');
        var doOrDont = confirm('are you sure you want to delete the admin?');
        if (doOrDont) {
            var idNum = Number(id.replace(/^\D+/g, ''));
            $('#mainAdminInfo').effect('slide', 'fast');
            $('#mainAdminsEdit').hide();
        }
        $.ajax({
            url: '../Server/API/deleteAdmin.php',
            type: 'POST',
            success: function (data) {
                $('.remove').remove();
                loadDataAdmin();
            },
            error: function (err) {
                console.log(err.responseText);
            },
            data: {
                id: idNum
            }
        });
    });
    function loadDataAdmin() {
        $('#Atable').empty();
        return $.ajax({
            url: '../Server/API/admins.php',
            type: 'POST',
            success: function (data) {
                adminData = data;
                for (let i of data) {
                    if (adminLoged[2] !== 'Owner') {
                        if (i[2] == 'Owner') {
                            continue;
                        }
                    }
                    $('#Atable').append('<tr class="adminTR remove" id="admin.' + i[0] + '"><td class="info"><img class="proPic" src="' + i[5] + '"/></td><td><p class="info">' + i[1] + ', ' + i[2] + '</p><p class="info">' + i[3] + '</p><p class="info">' + i[4] + '</p></td></tr>');
                }
                getNumberOf(data, 'numOfAdmins');
            },
            error: function (err) {
                console.log(err.responseText);
            }
        });
    }
    function newAdminDetails(url, id, name, phone, email, picture, role, pass, conPass) {
        $.ajax({
            url: url,
            type: 'POST',
            success: function (data) {
                $('.remove').remove();
                // setTimeout(function () {
                loadDataAdmin().done(function () {

                    var adminObj = getAdminFromData('admin.' + data);
                    id = ('admin.' + data);
                    currentAdmin(adminObj);
                    console.log(adminObj, adminData, id);
                // }, 50);
                });
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
                role: role,
                pass: pass,
                conPass: conPass
            }
        });
    }
    function getAdminFromData(id) {
        for (var i = 0; i < adminData.length; i++) {
            if ('admin.' + adminData[i][0] == id) {
                return adminData[i];
            }
        }
    }
    function getAdminInfoIntoForm(object) {
        $('#mainInfo').hide();
        $('#mainAdminInfo').hide();
        $('#mainAdminsEdit').effect('slide', 'fast');
        $('#adminEditName').val(object[1]);
        $('#adminEditRole').val(object[2]);
        $('#adminEditPhone').val(object[3]);
        $('#adminEditEmail').val(object[4]);
        $('#adminEditPicture').attr('src', (object[5]));
    }
    function currentAdmin(object) {
        $('#mainInfo').hide();
        $('#mainAdminInfo').hide();
        $('#mainCoursesInfo').hide();
        $('#mainCourseEdit').hide();
        $('#mainSudentEdit').hide();
        $('#mainSudentInfo').hide();
        $('#mainAdminsEdit').hide();
        $('#mainAdminsInfo').effect('slide', 'fast');
        $('#adminName').html(object[1]);
        $('#adminRole').html(object[2]);
        $('#adminPhone').html(object[3]);
        $('#adminEmail').html(object[4]);
        $('.adminPic').attr('src', object[5]);
    }
    // ----------------------------------- STUDENTS FUNCTIONS ----------------------------------
    $(document).on('click', '.stdTR', function (e) {
        var id = $($(e.target).parent()).parent()[0].id;
        var std_id = getStudentFromData(id);
        currentStd(std_id);
    });
    $('#editStd').on('click', function () {
        $('#Email').css('background-color', 'white');
        $('#stdErrMsg').html('');
        $('#studentsSigns').empty();
        $('#studentsSigns').append('<img id="vSignStd" class="goodOrBad" src="project-pics/vSign.png" /><img id="xSignStd" class="goodOrBad" src="project-pics/xSign.png" />');
        $('#vSignStd').hide();
        $('#xSignStd').hide();
        $('#mainSudentInfo').hide();
        $('#mainAdminInfo').hide();
        $('#mainInfo').hide();
        $('#updateStd').show();
        $('#deleteStd').show();
        $('#createStd').hide();
        $('#myUploadfile').val('');
        var id = $('#stdEmail').html();
        var std_id = getStudentFromData(id);
        getStudentInfoIntoForm(std_id);
        $('#Email').on('blur', function (e) {
            if (checkEmail('students', 'std_email', this, '#vSignStd', '#xSignStd', '#stdErrMsg')) {
                $('#updateStd').removeAttr('disabled');
            } else {
                $('#updateStd').attr('disabled', 'true');
            }
        });
    });
    $('#stdAdd').on('click', function () {
        $('#stdErrMsg').html('');
        $('#Email').css('background-color', 'white');
        $('#studentsSigns').empty();
        $('#studentsSigns').append('<img id="vSignStd" class="goodOrBad" src="project-pics/vSign.png" /><img id="xSignStd" class="goodOrBad" src="project-pics/xSign.png" />');
        $('#vSignStd').hide();
        $('#xSignStd').hide();
        $('#mainAdminInfo').hide();
        $('#createStd').show();
        $('#mainInfo').hide();
        $('#mainCoursesInfo').hide();
        $('#mainCourseEdit').hide();
        $('#updateStd').hide();
        $('#deleteStd').hide();
        $('#mainSudentInfo').hide();
        $('#mainSudentEdit').effect('slide', 'fast');
        $('#myUploadfile').val('');
        var checkboxVal = $('input:checkbox');
        $('.clean').val('');
        $('#Picture').attr('src', '');
        for (let a of checkboxVal) {
            a['checked'] = false;
        }
        $('#Email').on('blur', function (e) {
            if (checkEmail('students', 'std_email', this, '#vSignStd', '#xSignStd', '#stdErrMsg')) {
                $('#createStd').removeAttr('disabled');
            } else {
                $('#createStd').attr('disabled', 'true');
            }
        });
    });
    $('#createStd').on('click', function () {
        var newStdUrl = '../Server/API/newStudent.php';
        var id = $('#Email').val();
        var name = $('#Name').val();
        var phone = $('#Phone').val();
        var email = $('#Email').val();
        var picture = $('#Picture').attr('src');
        var courses = fillCourses(id);
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
        var courses = fillCourses(id);
        newStdDetails(updateUrl, id, name, phone, email, picture, courses);
    });
    $('#myStdUpload').on('click', function () {
        uploadImage('myUploadStdfile', 'Picture', '../../client/project-pics/profile-pictures/', 'project-pics/profile-pictures/');
    });
    $('#deleteStd').click(function () {
        alert('you are about to delete this student');
        var doOrDont = confirm('are you sure you want to delete the student?');
        if (doOrDont) {
            $('#mainInfo').effect('slide', 'fast');
            $('#mainSudentEdit').hide();
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
    function loadDataStd() {
        $('#Stable').empty();
        $.ajax({
            url: '../Server/API/students.php',
            type: 'POST',
            success: function (data) {
                stdData = data;
                stdNum = data.length;
                for (let i of data) {
                    $('#Stable').append('<tr class="stdTR remove" id="' + i[3] + '"><td class="info"><img class="proPic" src="' + i[4] + '"/></td><td><p class="info">' + i[1] + '</p><p class="info">' + i[2] + '</p></td></tr>');
                    var courses = (i[5]);
                    coursesArr.push(courses);
                    getNumberOf(data, 'numOfStudents');
                }
            },
            error: function (err) {
                console.log(err.responseText);
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
        $('#mainInfo').hide();
        $('#mainAdminInfo').hide();
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
    function fillCourses(id) {
        var coursesArr = [];
        for (let i of $('input:checkbox')) {
            if (i['checked']) {
                coursesArr.push(i['value']);
                updateCoursesTable(i['value'], id);
            } else {
                removedStudentsFromCourses(i['value'], id);
            }
        }
        return coursesArr.toString();
    }
    function updateCoursesTable(crs, id) {
        var data = {
            crs: crs,
            id: id
        }
        $.post('../Server/API/updateCoursesInStudents.php', data)
    }
    function removedStudentsFromCourses(crs, id) {
        var data = {
            crs: crs,
            id: id
        }
        $.post('../Server/API/removedStudentsFromCourses.php', data)

    }
    // ----------------------------------- COURSES FUNCTIONS ----------------------------------
    $(document).on('click', '.crsTR', function (e) {
        id = this.id;
        gId = id;
        var crsObj = getCoursesFromData(id);
        currentCrs(crsObj);
    });
    $('#editCrs').on('click', function () {
        $('#mainCoursesInfo').hide();
        $('#deleteCrs').hide();
        $('#mainInfo').hide();
        $('#updateCrs').show();
        $('#createCrs').hide();
        var crsObj = getCoursesFromData(id);
        getCoursesInfoIntoForm(crsObj);
    });
    $('#myCrsUpload').on('click', function () {
        uploadImage('myUploadCoursefile', 'crsPicture', '../../client/project-pics/courses-pictures/', 'project-pics/courses-pictures/');
    });
    $('#crsAdd').on('click', function () {
        $('#deleteCrs').hide();
        $('#mainAdminInfo').hide();
        $('#mainInfo').hide();
        $('#createCrs').show();
        $('#mainSudentEdit').hide();
        $('#mainSudentInfo').hide();
        $('#mainCoursesInfo').hide();
        $('#updateCrs').hide();
        $('#mainCourseEdit').effect('slide', 'fast');
        $('.clean').val('');
        $('#Picture').attr('src', '');
    });
    $('#createCrs').on('click', function () {
        var newStdUrl = '../Server/API/newCourses.php';
        var name = $('#crsNameEdit').val();
        var description = $('#crsDescription').val();
        var picture = $('#crsPicture').attr('src');
        var id = '';
        var students = '';
        newCrsDetails(newStdUrl, id, name, description, picture, students);

    });
    $('#updateCrs').on('click', function () {
        $('#updateStd').show();
        $('#createStd').hide();
        var updateUrl = '../Server/API/updateCourses.php';
        var name = $('#crsNameEdit').val();
        var description = $('#crsDescription').val();
        var picture = $('#crsPicture').attr('src');
        var students = updateStudentListInCourses(name);
        var numberId = Number(id.replace(/^\D+/g, ''));
        newCrsDetails(updateUrl, numberId, name, description, picture, students);
    });
    $('#deleteCrs').click(function () {
        alert('you are about to delete this course');
        var doOrDont = confirm('are you sure you want to delete the course?');
        if (doOrDont) {
            $('#mainInfo').effect('slide', 'fast');
            $('#mainCourseEdit').hide();
            var numberId = Number(id.replace(/^\D+/g, ''));
            for (let i of crsData) {
                if (i[0] == numberId) {
                    updateStudentListInCourses(0, i[1]);
                }
            }
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
    function loadDataCrs() {
        $('#Ctable').empty();
        $.ajax({
            url: '../Server/API/courses.php',
            type: 'POST',
            success: function (data) {
                crsData = data;
                for (let i in data) {
                    if (i % 2 == 0) {
                        var j = i;
                        $('#myCoursesList').append('<tr class="remove" id="tr' + j + '"><td></td></tr>');
                    }
                    $('#Ctable').append('<tr class="crsTR remove" id="crs.' + data[i][0] + '"><td class="info"><img class="proPic" src="' + data[i][3] + '"/></td><td><p class="info">' + data[i][1] + '</p><p></P></td></tr>');
                    $('#tr' + j).append('<td><span class="mySpan checkbox"><label><input type="checkbox" value="' + data[i][1] + '">' + data[i][1] + '</span></td>')
                    var studentCourses = (data[i][4]);
                    studentCrsArr.push(studentCourses);
                    getNumberOf(data, 'numOfCourses');
                }
            },
            error: function (err) {
                console.log(err.responseText);
            }
        });
    }
    function newCrsDetails(url, id, name, des, picture, students) {
        $.ajax({
            url: url,
            type: 'POST',
            success: function (data) {
                $('.remove').remove();
                loadDataStd();
                loadDataCrs();
                setTimeout(function () {
                    var crs = getCoursesFromData('crs.' + data);
                    currentCrs(crs);
                    id = ('crs.' + data);
                }, 50);
            },
            error: function (err) {
                console.log(err.responseText);
            },
            data: {
                id: id,
                name: name,
                des: des,
                picture: picture,
                students: students
            }
        });
    }
    function getCoursesFromData(id) {
        for (var i = 0; i < crsData.length; i++) {
            if ('crs.' + crsData[i][0] == id) {
                if (crsData[i][4] == "") {
                    $('#deleteCrs').show();
                }
                return crsData[i];
            }
        }
    }
    function currentCrs(object) {
        var stdEnrolledNum = (object[4].split(',')).length - 1;
        $('#mainInfo').hide();
        $('#mainAdminInfo').hide();
        $('#mainSudentEdit').hide();
        $('#mainCourseEdit').hide();
        $('#mainSudentInfo').hide();
        $('#mainCoursesInfo').effect('slide', 'fast');
        $('#crsName').html('Coures ' + object[1] + ', ' + stdEnrolledNum + ' Students');
        $('#crsDesc').html(object[2]);
        $('.crsPic').attr('src', (object[3]));
        // $('#stdNum').html(stdEnrolledNum);
        $('.removeCrs').remove();
        var stdEnrolled = updateStudentListInCourses(object[1]);
        for (let j of stdEnrolled) {
            for (let i of stdData) {
                if (j == i[3]) {
                    $('#stdEnrolled').append('<tr class="removeCrs" id="' + i[3] + '"><td class="infoCrs"><img class="proPic" src="' + i[4] + '"/></td><td><p class="info">' + i[1] + '</p><p class="info">' + i[2] + '</p></td></tr>');
                }
            }
        }
    }
    function getCoursesInfoIntoForm(object) {
        $('#mainCourseEdit').effect('slide', 'fast');
        $('#crsNameEdit').val(object[1]);
        $('#crsDescription').val(object[2]);
        $('#crsPicture').attr('src', (object[3]));
    }
    function updateStudentListInCourses(crs, deleteCrs) {
        if (crs) {
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
        if (deleteCrs) {
            var data = {
                crs: deleteCrs
            }
            $.post('../Server/API/deleteCourseInStudents.php', data);
        }
    }
});