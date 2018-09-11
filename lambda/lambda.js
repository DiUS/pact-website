var AWS = require('aws-sdk')
var ses = new AWS.SES()
var s3 = new AWS.S3();

var RECEIVER = 'pact@dius.com.au'
var SENDER = 'sysadmin@dius.com.au'

exports.handler = function (event, context) {
    console.log('Received event:', event)
    var params = {
      Bucket: 'pact-saas-form-data',
      Key:  new Date().toISOString(),
      Body: JSON.stringify(event)
    }

    s3.putObject(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else     console.log(data);
    });

    sendEmail(event, function (err, data) {
        context.done(err, null)
    })
}


function sendEmail (event, done) {
    
    var d = new Date()
    var human = 'Company Name: ' + event.company_name + '\nFirst Name: ' + event.first_name + '\nLast Name: ' + event.last_name + '\nCompany URL: ' + event.company_url + '\nEmail: ' + event.email + '\nPhone Number: ' + event.phone_number + '\nPromo Code: ' + event.promo_code + '\nHow do you hear about us: ' + event.how_hear;
    var script = 'ENVIRONMENT=prod ./scripts/create-customer.sh "' + event.company_name + '" "' + event.first_name + '" "' + event.email + '"';
    var spreadsheet = [event.company_name, d.getFullYear() + '-' + d.getMonth() + '-' + d.getUTCDate(),d.getUTCMonth() + '-' + d.getUTCDate(), event.email, event.promo_code + ' ' + event.how_hear, '', event.phone_number, event.first_name, event.last_name, event.company_url].join(',');

    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: [human, script, spreadsheet].join('\n\n'),
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

console.log('foo')