const clientId = process.env.AZURE_CLIENT_ID;

export const msalConfig = {
    auth: {
      clientId: clientId!,
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000',
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    },
  };
  
  export const graphScopes = ['User.Read', 'Contacts.Read', 'Mail.Read'];
