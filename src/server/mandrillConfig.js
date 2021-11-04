const { mandrillAPIKey } = process.env;

const mandrill = require("node-mandrill")(mandrillAPIKey);

export const sendEmail = (_name, _email, _subject, _message, callback) => {
  mandrill(
    // API Route
    "/messages/send",
    // Config Object
    {
      message: {
        to: [{ email: _email, name: _name }],
        from_email: "noreply@yourdomain.com",
        subject: _subject,
        text: _message,
      },
    },
    // Callback
    (err, response) => {
      if (err || response[0].status === 'rejected') {
        callback('message not sent')
      } else {
        callback('message sent')
      }
    }
  );
};
