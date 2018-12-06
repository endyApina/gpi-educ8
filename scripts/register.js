$(document).ready(function()
    {
    //console.log('My JS file');
    var checkId = $(this).find('option:selected').attr('id');
    if (checkId != "student" || checkId != "lecturer") {
    	$('#categoryBody').html(`
            <div class="bg-font-default">
                <h4 class="block" style="padding-left: 3%;">Kindly choose a category</h4>
            </div>
        `);
    }
    //console.log(checkId);
    $('#category').change(function(){
    	var id = $(this).find('option:selected').attr('id');
    	//console.log(id);
    	var students = `
    		<div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Matric No.</label>
                        <input type="text" name="uniqueNo" class="form-control" placeholder="LCU/UD/12/1334"> 
                    </div>
                </div>
                <!--/span-->
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" class="form-control" placeholder="Password"> 
                    </div>
                </div>
                <!--/span-->
            </div>
    	`

        var lecturer = `
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Lecture Code</label>
                        <input type="text" name="uniqueNo" class="form-control" placeholder="LCU/UD/SP/23"> 
                    </div>
                </div>
                <!--/span-->
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" class="form-control" placeholder="Password"> 
                    </div>
                </div>
                <!--/span-->
            </div>
        `

        var main = 
        `
            <div class="row">
                <!--/span-->
                <div class="col-md-6">
                    <div class="form-group">
                    <label class="control-label">Faculty</label>
                        <select class="form-control" id="faculty" name="faculty" data-placeholder="Choose a Category" tabindex="1" >
                            <option value="">Faculty</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                    <label class="control-label">Department</label>
                        <select class="form-control" name="department" data-placeholder="Choose a Category" tabindex="1" id="department">
                            <option value="">Department</option>
                        </select>
                    </div>
                </div>
                <!--/span-->
            </div>
        `
        

        var defaults = 
        `
            <div class="bg-font-default">
                <h4 class="block" style="padding-left: 1%;">Kindly Choose Your Category</h4>
            </div>
        `

    	if (id === "student") {
    		$('#categoryBody').html(students + main);	
    	} else if (id === "lecturer") {
    		$('#categoryBody').html(lecturer + main);
    	} else if (id != "student" || id != "lecturer") {
    		$('#categoryBody').html(defaults);
    	}


        $.ajax({
            type: "GET",
            data: id,
            url: "http://localhost:9119/getFaculty",
            async: true,
            success: function(data,data1,data2)
            {
                //console.log(data);
                var responseData = data.Data

                for (var i = 0; i < responseData.length; i++){
                    counter = 0;
                    //console.log(responseData);
                    //console.log(responseData[i]);

                    var faculty = responseData[i].faculty;
                    var id = responseData[i].id;
                    var facultyColumn = `
                        <option id="action" data-option-id=${id} value="${faculty}">${faculty}</option>
                    `

                    $('#faculty').append(facultyColumn);
                    //console.log("Faculty: " + faculty);
                    //console.log("ID: " + id);
                    var departments = responseData[i].departments
                    //console.log(departments);

                    for (var j = 0; j <departments.length; j++) {
                        //var sciences = "Sciences";

                        //console.log(departments[i]);
                        var department = departments[j].department;
                        //console.log(department);

                    }

                    // counter+1;
                    // console.log(counter);
                }


                // console.log(data);
                // var dataArray [];
                // dataArray = data.Data
                // console.log(faculty);
            },
            error: function (xhr, status, error)
            {
                
            },
            contentType: "application/x-www-form-urlencoded",
            complete: function(xhr,status) { },
            dataType: "JSON"
        });

        $(document).on('click', 'select#faculty', function(e){
            var value = $(this).val();

            $.ajax({
                type: "GET",
                url: "http://localhost:9119/getFaculty",
                async: true,
                success: function(data){
                    var responseData = data.Data

                    for (var i = 0; i < responseData.length; i++){
                        counter = 0;
                        //console.log(responseData);
                        //console.log(responseData[i]);
                        var faculty = responseData[i].faculty;
                        var id = responseData[i].id;
                        var departments = responseData[i].departments

                        if (faculty === value) {
                            departmentVal = departments;
                            for (var dpt = 0; dpt < departmentVal.length; dpt++) {
                                //console.log(departmentVal[dpt]);
                                var deprtmnt = departmentVal[dpt].department;

                                var departmentColumn = `
                                    <option id="action" value="${deprtmnt}">${deprtmnt}</option>
                                `;

                                $('#department').append(departmentColumn);

                            }
                            return false 
                        }

                        //console.log("Faculty: " + faculty);
                        //console.log("ID: " + id);
                        
                        

                        // counter+1;
                        // console.log(counter);
                    }
                },
                error: function(){

                },
                contentType: "application/x-www-form-urlencoded",
                dataType: "JSON"
            });
            

        })

        //contentType: "application/json",
    	
    })

    $('#submitBtn').click(function(e) {
        e.preventDefault();

        var form = $('#submitBtn').closest('form');
        var serie = $(form).serialize();
        //console.log(serie);

        $.ajax({
            type: "POST",
            url: "http://localhost:9119/register",
            data: serie,
            async: true,
            success: function(data){
                console.log(data);
            },
            error: function(xhr){
                console.log(xhr);
            },
        });

        // var fd = new FormData();
        // var files = $('#file')[0].files[0];
        // var email = window.localStorage.getItem("Email");
        // fd.append('file', files);
        // fd.append('email', email);
    });

})