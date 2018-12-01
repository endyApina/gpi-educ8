$(document).ready(function(){
    function loadPageVar (sVar) {
        return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }


        if (loadPageVar("conn") == "courses") {

            $(document).ready(function(e) {
            
                $('#content').load('courses.html',function(){});
            });
        } else if (loadPageVar("conn") == "upload") {

            $(document).ready(function(e) {
            
                $('#content').load('uploadFiles.html',function(){});
            });
        } else if (loadPageVar("conn") == "details") {

            $(document).ready(function(e) {
            
                $('#content').load('courseDetails.html',function(){});
            });
        } else if (loadPageVar("conn") == "students") {

            $(document).ready(function(e) {
            
                $('#content').load('students.html',function(){});
            });
        } else {
            $(document).ready(function()
            {
                //$('#header-menu').load('nav-bar.html', function(){});
                $('#content').load('home.html', function(){});

        }
    )};
})