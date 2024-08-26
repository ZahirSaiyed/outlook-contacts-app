import React from 'react';
import { useMsal } from "@azure/msal-react";
import { graphScopes, msalConfig } from '../../config';

export const OutlookSignInButton = () => {
  const { instance } = useMsal();

  const handleSignIn = () => {
    const loginRequest = {
      scopes: graphScopes,
      extraQueryParameters: { client_id: msalConfig.auth.clientId }
    };

    instance.loginPopup(loginRequest).catch(console.error);
  };

  return (
    <button
      onClick={handleSignIn}
      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 flex items-center space-x-2"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.179 4.885l-7.679 5.747v8.181l7.679-4.779V4.885zM2.821 4.885v9.149l7.679 4.779v-8.181L2.821 4.885z"/>
      </svg>
      <span>Connect Outlook</span>
    </button>
  );
};

export const GmailSignInButton = () => (
    <button
    disabled
    className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out cursor-not-allowed flex items-center space-x-2 opacity-50"
  >
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
    </svg>
    <span>Connect Gmail (Coming Soon)</span>
  </button>
);