import "@/styles/globals.css";
import { ApolloProvider, useApolloClient } from "@apollo/client";
import type { AppProps } from "next/app";
import { client } from "../grahpql/apollo-client";
import Layout from "./layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
