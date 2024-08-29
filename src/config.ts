export const msalConfig = {
    auth: {
      clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || '',
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000',
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    },
  };
  
  export const graphScopes = ['User.Read', 'Contacts.Read', 'Mail.Read'];
