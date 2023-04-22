import { Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { THE_GRAPH_ENDPOINT } from './contants';
import { pairInfoQuery } from './queries';
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

  /**
   * Builds a data query string by replacing the `addressPair` parameter in the
   * provided query string with the specified address.
   *
   * @param {string} query - The original query string.
   * @param {string} address - The address to replace `addressPair` with in the query string.
   * @returns {string} The new query string with the `addressPair` parameter replaced by `address`.
   */
  buildPairDataQuery(query, address) {
    // This function is because I can't put parameters inside the `where` clause.

    const search = 'addressPair';
    const replacement = `"${address}"`;
    const newQuery = query.replace(search, replacement);

    console.log(newQuery);

    return newQuery;
  }
}
