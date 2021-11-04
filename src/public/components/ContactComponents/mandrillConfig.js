const mandrill = require("node-mandrill")("3wc_vtNZpHlJdf0qSDtqEg");

const sendEmail = (_name, _email, _subject, _message) => {
  mandrill(
    "/messages/send",
    {
      message: {
        to: [{ email: _email, name: _name }],
        from_email: "noreply@yourdomain.com",
        subject: _subject,
        text: _message,
      },
    },
    (err, response) => {
      if (err) console.log(err);
      else console.log(response)
    });
};
