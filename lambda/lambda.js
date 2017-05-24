var AWS = require('aws-sdk')
var ses = new AWS.SES()
var s3 = new AWS.S3();

var RECEIVER = 'pact@dius.com.au'
var SENDER = 'sysadmin@dius.com.au'

exports.handler = function(event, context) {
  console.log('Received event:', event)
  var params = {
    Bucket: 'pact-saas-form-data',
    Key: new Date().toISOString(),
    Body: JSON.stringify(event)
  }

  s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });

  sendEmail(event, function(err, data) {
    context.done(err, null)
  })
}


function sendEmail(event, done) {
  var params = {
    Destination: {
      ToAddresses: [
        RECEIVER
      ]
    },
    Message: {
      Body: {
        Text: {
          Data: 'Company Name: ' + event.company_name + '\nFirst Name: ' + event.first_name + '\nLast Name: ' + event.last_name + '\nCompany URL: ' + event.company_url + '\nEmail: ' + event.email + '\nPhone Number: ' + event.phone_number + '\nPromo Code: ' + event.promo_code + '\nHow do you hear about us: ' + event.how_hear + '\nWhat time zone are you in: ' + event.time_zone,
          Charset: 'UTF-8'
        }
      },
      Subject: {
        Data: 'DiUS Pact Broker Service Interest Registration: ' + event.first_name,
        Charset: 'UTF-8'
      }
    },
    Source: SENDER
  }
  ses.sendEmail(params, done)
}
