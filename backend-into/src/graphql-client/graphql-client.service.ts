import { Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { THE_GRAPH_ENDPOINT } from './contants';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
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

  buildPairDataQuery(query:DocumentNode, address:string) {
    // this is a workaround to replace the placeholder in the query inside the where filter
    const updatedQuery = query.loc.source.body.replace(/PAIR_ADDRESS_PLACEHOLDER/g, address);
    return gql`${updatedQuery}`;
  }
  
}
