const clientId = process.env.AZURE_CLIENT_ID || '';
console.log('Client ID:', clientId);

export const msalConfig = {
  auth: {
    clientId: clientId,
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: process.env.REDIRECT_URI || '',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const graphScopes = ['User.Read', 'Contacts.Read', 'Mail.Read'];