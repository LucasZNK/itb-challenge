import '@/styles/globals.css'
import { ApolloProvider, useApolloClient } from '@apollo/client'
import type { AppProps } from 'next/app'
import {client} from "../grahpql/apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  
  return <ApolloProvider client={client}>
    <Component {...pageProps} />

  </ApolloProvider>
}
