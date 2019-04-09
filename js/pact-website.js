$(document).ready(function(){
  var REGISTRATIONS_GATEWAY_URL_DEV = 'https://2c6kjv2409.execute-api.ap-southeast-2.amazonaws.com/Stage/api/registrations'
  var REGISTRATIONS_GATEWAY_URL_PROD = 'https://h3dk1l7b62.execute-api.ap-southeast-2.amazonaws.com/Prod/api/registrations'

$('#register-form').submit(function (event) {
  event.preventDefault();

  var data = {
    requested_subdomain: $("#requested_subdomain").val(),
    company_name: $("#company_name").val(),
    first_name: $("#first_name").val(),
    last_name: $("#last_name").val(),
    company_url: $('#company_url').val(),
    email: $('#email').val(),
    how_hear: $('#how_hear').val(),
    github_auth: $('#github_auth').prop('checked')
  }

  $.ajax({
    type: 'POST',
    url: REGISTRATIONS_GATEWAY_URL_DEV,
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
  })

  $.ajax({
    type: 'POST',
    url: REGISTRATIONS_GATEWAY_URL_PROD,
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
