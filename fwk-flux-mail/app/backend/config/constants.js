module.exports = {
    creds: {
      redirectUrl: 'http://www.cfavorita.ec/error',
      endPointURL: 'https://login.microsoftonline.com/a5e467d2-54b5-4715-b802-ffa1d47a3219/oauth2/token',
      applicationID: 'https://login.microsoftonline.com/a5e467d2-54b5-4715-b802-ffa1d47a3219/oauth2/token',
      clientID: '8a5fa529-ec9e-4ee4-8bef-df238d9b85bc',
      clientSecret: 'LCyadp89T2cloH7uazQgAM3lbWOIBtYnrf42/gBdfpg=',
      resource: 'https://graph.microsoft.com',
      version: '/v1.0',
      grantTypePassword: 'password',
      grantTypeRefresh: 'refresh_token',
      identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
      allowHttpForRedirectUrl: true, // For development only
      responseType: 'code',
      validateIssuer: false, // For development only
      responseMode: 'query',
      scope: ['User.Read', 'Mail.Send', 'Files.ReadWrite', 'Mail.ReadWrite']
    },
    urls:{
      mailFolder: '/me/mailFolders',
      inbox: '/inbox',
      messages: '/me/messages',
      inboxMessage: '/inbox/messages',
      contacts: '/me/contacts',
      sendMail: '/me/sendMail',
      fordward: '/forward',
      simpleReply: '/reply',
      attachments: '/attachments',
      createReply: '/createReply',
      send: '/send',
      deletedItems: '/deleteditems',
      move: '/move'
    },
    resources:{
      deletedItems: 'deleteditems'
    },
    options:{
      expandAttachments: 'expand=attachments(select=isInline,name,contentType)',
      attachmentBasicInfo: 'select=isInline,name,contentType',
      bearerAuthorization: 'Bearer ',
      filterByTime: '$filter=ReceivedDateTime ge '
    }
  };