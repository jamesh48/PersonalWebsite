const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = (_subject, _message, callback) => {

  const msg = {
    to: 'jameshrivnak4@gmail.com',
    // Use the email address or domain you verified
    from: 'james@fullstackhrivnak.com',
    subject: _subject,
    text: _message,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  sgMail
  .send(msg)
  .then((response) => {
    callback('message sent')
  }, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
      res.send(error.response.body);
    }
  });
}
