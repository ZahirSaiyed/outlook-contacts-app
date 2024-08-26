export const msalConfig = {
    auth: {
      clientId: "YOUR_CLIENT_ID",
      authority: "https://login.microsoftonline.com/common",
      redirectUri: "http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    },
};

export const graphScopes = ['User.Read', 'Contacts.Read', 'Mail.Read'];