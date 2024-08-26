if (!process.env.AZURE_CLIENT_ID || !process.env.REDIRECT_URI) {
    throw new Error('Missing environment variables for AZURE_CLIENT_ID or REDIRECT_URI');
  }
  
export const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID || '',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: process.env.REDIRECT_URI || '',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const graphScopes = ['User.Read', 'Contacts.Read', 'Mail.Read'];