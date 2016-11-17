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
    phone_number: $('#phone_number').val()
    promo_code: $('#promo_code').val()
  }

  $.ajax({
    type: 'POST',
    url: URL,
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
    // NOTE: API Gateway will always return nothing which it will alway end up fail.
    // in this case ajax success/fail is not needed.
  })
})


$('#register-form').on('submit', function(){
  setTimeout(function () {
    console.log('done');
    $('#register-form')[0].reset();
    $('.registration').hide();
    $('.signup-complete').show();
  }, 500);

})
});
