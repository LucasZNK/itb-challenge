import { Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { THE_GRAPH_ENDPOINT } from './contants';
@Injectable()
export class GraphQLClientService {
  private client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient(THE_GRAPH_ENDPOINT);
  }

  setUri(uri: string): void {
    this.client = new GraphQLClient(uri);
  }

  getClient(): GraphQLClient {
    return this.client;
  }

  buildPairDataQuery(pairInfoQuery, address: string) {
   const newQuery = pairInfoQuery.replace('PAIR_ADDRESS_PLACEHOLDER', address);
   return newQuery
  }
  
}
