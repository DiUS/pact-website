$(document).ready(function(){

  var urlParams = new URLSearchParams(window.location.search);

  // Chargebee configurations
  // Staging: https://staging.pactflow.io/register/complete/?sub_id={{subscription.id}}&customer_id={{invoice.id}}&plan_id={{plan.id}}&first_name={{customer.first_name}}&last_name={{customer.last_name}}&email={{customer.email}}&company={{customer.company}}/register/complete/?sub_id={{subscription.id}}&customer_id={{invoice.id}}&plan_id={{plan.id}}&first_name={{customer.first_name}}&last_name={{customer.last_name}}&email={{customer.email}}&company={{customer.company}}
  // Prod: https://pactflow.io/register/complete/?sub_id={{subscription.id}}&customer_id={{invoice.id}}&plan_id={{plan.id}}&first_name={{customer.first_name}}&last_name={{customer.last_name}}&email={{customer.email}}&company={{customer.company}}/register/complete/?sub_id={{subscription.id}}&customer_id={{invoice.id}}&plan_id={{plan.id}}&first_name={{customer.first_name}}&last_name={{customer.last_name}}&email={{customer.email}}&company={{customer.company}}
  // Local dev: http://localhost:4000/register/complete/?sub_id={{subscription.id}}&customer_id={{invoice.id}}&plan_id={{plan.id}}&first_name={{customer.first_name}}&last_name={{customer.last_name}}&email={{customer.email}}&company={{customer.company}}/register/complete/?sub_id={{subscription.id}}&customer_id={{invoice.id}}&plan_id={{plan.id}}&first_name={{customer.first_name}}&last_name={{customer.last_name}}&email={{customer.email}}&company={{customer.company}}
  // http://localhost:4000/register/complete/?sub_id=1234&customer_id=5678&plan_id=team5&first_name=Matt&last_name=Fellows&email=m@onegeek.com.ua&company=test%20company

  // If on the complete signup page, pre-fill the form
  if (window.location.pathname === "/register/complete/") {
    if (urlParams.has('sub_id')) {
      $("#subscription_id").val(urlParams.get('sub_id'))
    }
    if (urlParams.has('customer_id')) {
      $("#customer_id").val(urlParams.get('customer_id'))
    }
    if (urlParams.has('plan_id')) {
      $("#plan_id").val(urlParams.get('plan_id'))
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
      plan_id: $('#plan_id').val(),
      subscription_id: $('#subscription_id').val(),
      customer_id: $('#customer_id').val(),
      github_auth: $('#github_auth').prop('checked'),
      cognito_enabled: $('#cognito_enabled').prop('checked')
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
