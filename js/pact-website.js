$(document).ready(function(){
  console.log("works");

  var URL = 'https://z4bzdlc927.execute-api.us-east-1.amazonaws.com/staging/register'
 
$('#register-form').submit(function (event) {
  event.preventDefault();
 
  var data = {
    company_name: $("#company_name").val(),
    first_name: $("#first_name").val(),
    last_name: $("#last_name").val(),
    company_url: $('#company_url').val(),
    email: $('#email').val()
  }
 
  $.ajax({
    type: 'POST',
    url: URL,
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function () {
      console.log("success, now clear form values");
      $('input').val("");
    },
    error: function () {
      console.log("ooops, failed");
    }
  })
})

});
