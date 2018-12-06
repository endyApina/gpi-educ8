$(document).ready(function() {
	$('#loginbtn').click(function(e) {
		e.preventDefault();
		var form = $('#loginbtn').closest('form');
        var serie = $(form).serialize();
       	// var data = {
       	// 	"uniqueNo": "admin",
       	// 	"password": "admin",
       	// };

        //console.log(serie);
        $.ajax({
        	type: "POST",
        	url: "http://localhost:9119/test",
        	data: serie,
        	async: true,
        	success: function(data){
        		console.log(data);
        	},
        	error: function(xhr, status, error){
        		console.log(xhr);
        		console.log(status);
        		console.log(error);
        	}
        });

	});
})