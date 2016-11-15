$(document).ready(function() {
	// var URL = 'https://z4bzdlc927.execute-api.us-east-1.amazonaws.com/staging/register'

	// $('#register-form').submit(function(event){
	// 	event.preventDefault();

	// 	var data = {
	// 		name: $("#first_name").val(),
	// 		email: $('#email').val(),
	// 		url: $('#company_url').val()
	// 	}

	// 	console.log(name, email, url);

	// 	$.ajax({
	// 		type: 'POST',
	// 		url: URL,
	// 		dataType: 'json',
	// 		contentType: 'application/json',
	// 		data: JSON.stringify(data),
	// 		success: function(){
	// 			alert("clear form and show a success message");
	// 			console.log("clear form and show a success message");
	// 		},
	// 		error: function(){
	// 			alert("ooops, sth went wrong");
	// 			console.log("ooops, sth went wrong")
	// 		}
	// 	})

	$('#submit-button').click(function(){ alert(" submit button clicked 17:08" )});
	console.log("inside docment.ready function");
	})





});
