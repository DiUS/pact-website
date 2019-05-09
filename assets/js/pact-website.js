$(document).ready(function(){

  var urlParams = new URLSearchParams(window.location.search);

  // Chargebee configurations
  // If on the complete signup page, pre-fill the form
  if (window.location.pathname === "/register/complete/") {
    if (urlParams.has('sub_id')) {
      $("#chargebee_subscription_id").val(urlParams.get('sub_id'))
    }
    if (urlParams.has('customer_id')) {
      $("#chargebee_customer_id").val(urlParams.get('customer_id'))
    }
    if (urlParams.has('plan_id')) {
      $("#chargebee_plan_id").val(urlParams.get('plan_id'))
    }
    if (urlParams.has('first_name')) {
      $("#first_name").val(urlParams.get('first_name'))
    }
    if (urlParams.has('last_name')) {
      $("#last_name").val(urlParams.get('last_name'))
    }
    if (urlParams.has('email')) {
      $("#email").val(urlParams.get('email'))
    }
    if (urlParams.has('company')) {
      $("#company_name").val(urlParams.get('company'))
    }
  }

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
      chargebee_plan_id: $('#chargebee_plan_id').val(),
      chargebee_subscription_id: $('#chargebee_subscription_id').val(),
      chargebee_customer_id: $('#chargebee_customer_id').val(),
      github_org_auth: $('#github_org_auth').prop('checked'),
    }

    $.ajax({
      type: 'POST',
      url: REGISTRATIONS_GATEWAY_URL,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: res => {
        console.log('response from provisioning: ', res)
        $("#form-failure-alert").hide()

        // Do it on the actual succes!
        console.log('done');
        $('#register-form')[0].reset();
        $('.registration').hide();
        $('.signup-complete').show();
      },
      error: e => {
        console.log('error provisioning:', e)
        $("#form-failure-alert").html("There was an error creating your account, please try again or contact support@pactflow.io for assistance");
        $("#form-failure-alert").fadeTo(2000, 200);
        $("#form-failure-alert-bottom").html("There was an error creating your account, please try again or contact support@pactflow.io for assistance");
        $("#form-failure-alert-bottom").fadeTo(2000, 200);
      },
      complete: (a,b,c) => {
        console.log('completed?', a, b, c)
      }
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

  $('#requested_subdomain').on('blur', () => {
    $.ajax({
      type: 'GET',
      url: REGISTRATIONS_GATEWAY_URL + '/subdomain/' + $('#requested_subdomain').val(),
      dataType: 'json',
    }).then((res) => {
      console.log('lookup response:', res)

      if (res.available == false) {
        $(".alert").slideUp(500);
        $("#failure-alert").html("Hosted subdomain '" + $('#requested_subdomain').val() + " 'is unavailable, please try another");
        $("#failure-alert").fadeTo(2000, 200);
        $('#requested_subdomain').val('')
      } else {
        $("#failure-alert").hide()
      }
    })
  })
});
