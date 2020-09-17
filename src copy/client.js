import React from "react";
import { getClient, getClientUri } from "@base86inc/apollo-client";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import { auth } from "firebase/app";

const stage = process.env.REACT_APP_CLIENT_STAGE || 'production_v1';
const apiUri = getClientUri(stage);

export const previewClient = getClient(stage, async () => {
  return {
    headers: {
      "X-Auth-Token": "preview"
    }
  };
});

export const client = getClient(stage, async () => {
  const user = auth().currentUser;
  const token = await (user && user.getIdToken());
  return {
    headers: {
      "X-Auth-Token": token
    }
  };
});

export const Base86Provider = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
    </ApolloProvider>
  );
};

export const Base86PreviewProvider = ({ children }) => {
  return (
    <ApolloProvider client={previewClient}>
      <ApolloHooksProvider client={previewClient}>
        {children}
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export function scanAll() {
  return fetch(`${apiUri}/scanner`).then(r => r.json());
}
