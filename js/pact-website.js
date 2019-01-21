$(document).ready(function(){
  var URL = 'https://z4bzdlc927.execute-api.us-east-1.amazonaws.com/staging/register'
  var URL_B = 'https://xitqupigzd.execute-api.ap-southeast-2.amazonaws.com/Prod/api/registrations'

$('#register-form').submit(function (event) {
  event.preventDefault();

  var data = {
    requested_subdomain: $("#requested_subdomain").val(),
    company_name: $("#company_name").val(),
    first_name: $("#first_name").val(),
    last_name: $("#last_name").val(),
    company_url: $('#company_url').val(),
    email: $('#email').val(),
    phone_number: $('#phone_number').val(),
    promo_code: $('#promo_code').val(),
    how_hear: $('#how_hear').val()
  }

  $.ajax({
    type: 'POST',
    url: URL,
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
    // NOTE: API Gateway will always return nothing which it will alway end up fail.
    // in this case ajax success/fail is not needed.
    // success: function () {
    //   console.log("success, now clear form values");
    //   $('input').val("");
    // },
    // error: function () {
    //   console.log("ooops, failed");
    // }
  })

  $.ajax({
    type: 'POST',
    url: URL_B,
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
  })

  try {
    // Registery event with GA
    ga('send', 'event', {
      eventCategory: 'registration',
      eventAction: 'complete',
      eventLabel: 'beta'
    });
  } catch (e) {
    console.log("Exception reporting to GA: " + e);
  }
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
