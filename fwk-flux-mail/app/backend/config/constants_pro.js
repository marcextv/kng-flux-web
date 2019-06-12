module.exports = {
    creds: {
      allowHttpForRedirectUrl: true, // For development only
      responseType: 'code',
      validateIssuer: false, // For development only
      responseMode: 'query',
      scope: ['User.Read', 'Mail.Send', 'Files.ReadWrite', 'Mail.ReadWrite']
    }
  };