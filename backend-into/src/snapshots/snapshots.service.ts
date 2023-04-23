import { Injectable, OnModuleInit } from '@nestjs/common';
import { SnapshotPairData } from './entities/snapshot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GraphQLClientService } from 'src/graphql-client/graphql-client.service';
import { GraphQLClient, Variables } from 'graphql-request';
import { pairInfoQuery } from 'src/graphql-client/queries';
import { initialPairs } from './constants/initial-addresses';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DocumentNode } from 'graphql';
import {
  IPair,
  IPairHourData,
  IPairHourDatasResponse,
} from './interfaces/pair-hour.interface';
import { Pair } from './entities/pair.entity';

@Injectable()
export class SnapshotsService implements OnModuleInit {
  graphqlExternalClient: GraphQLClient;
  initialPairs;
  constructor(
    @InjectRepository(SnapshotPairData)
    private snapshotRepository: Repository<SnapshotPairData>,
    @InjectRepository(Pair)
    private pairRepository: Repository<Pair>,
    private graphqlClientService: GraphQLClientService,
  ) {
    this.graphqlExternalClient = this.graphqlClientService.getClient();
    this.initialPairs = initialPairs;
  }

  async onModuleInit() {
    console.log('Snapshots service initialized');

    try {
      initialPairs.forEach(async (address) => {
        const query = this.graphqlClientService.buildPairDataQuery(
          pairInfoQuery,
          address,
        );

        let pair = await this.pairRepository.findOne({
          where: { address: address },
        });

        if (!pair) {
          let response: IPairHourDatasResponse = await this.fetchPairData(
            query,
            48,
          );

          console.log(response);

          if (response) {
            let newPair = await this.createPair(
              response.pairHourDatas[0].pair,
              address,
            );

            await this.saveSnapshotsFrom48hs(response.pairHourDatas, newPair);




            const pairTest = await this.pairRepository.findOne({
              where: { address: address },
            });

         

            const snapshots = await this.snapshotRepository.find({
              where: { pair: { id: pairTest.id } },
            });
  
            console.log(snapshots)
          } else {
            console.log('Error fetching data');
          }
          // } else {
          //   const dataNeedsUpdate = this.verifySnapshotIsOlderThan1Hour(address);
          //   if (dataNeedsUpdate) {
          //     const query = this.graphqlClientService.buildPairDataQuery(
          //       pairInfoQuery,
          //       address,
          //     );

          //     const data = await this.f etchPa irData(query, 1);
          //     await this.saveSnapshot(data, pair);
          //   }
        } else {
          // verify if is older than 1 hour and fetch
        }
      });
    } catch (error) {}
  }

  async fetchPairData(query: DocumentNode, fromHoursAgo: number): Promise<any> {
    const params: Variables = {
      fromHoursAgo: fromHoursAgo,
    };

    const data = await this.graphqlExternalClient.request(query, params);
    return data;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async getPairsInforLastHour() {
    initialPairs.forEach(async (address) => {
      const dataNeedsUpdate = this.verifySnapshotIsOlderThan1Hour(address);
      if (dataNeedsUpdate) {
        const query = this.graphqlClientService.buildPairDataQuery(
          pairInfoQuery,
          address,
        );

        const pair = await this.pairRepository.findOne({
          where: { address: address },
        });

        const data = await this.fetchPairData(query, 1);
        await this.saveSnapshot(data, pair);
      }
    });
  }

  private async saveSnapshotsFrom48hs(
    pairHourDatas: IPairHourData[],
    pair: Pair,
  ) {
    // For each pairHourData in the response, call the saveSnapshot function to save the snapshot to the database.

    for (let index = 0; index < pairHourDatas.length; index++) {
      const pairHourData = pairHourDatas[index];

      await this.saveSnapshot(
        pair,
        pairHourData,
        this.generateTimestamp(index),
      );
    }

    console.log("Finished ")

    return { success: true, error: null } ;
  }

  private async saveSnapshot(pair:Pair, pairHourData, customTimestamp = new Date()) {
    try {
      const newSnapshotPairData = this.snapshotRepository.create({
        pair: pair,
        hourlyVolumeToken0: pairHourData.hourlyVolumeToken0,
        hourlyVolumeToken1: pairHourData.hourlyVolumeToken1,
        hourlyVolumeUSD: pairHourData.hourlyVolumeUSD,
        reserve0: pairHourData.reserve0,
        reserve1: pairHourData.reserve1,
        reserveUSD: pairHourData.reserveUSD,
        timestamp: customTimestamp,
      });

      await this.snapshotRepository.save(newSnapshotPairData);
      console.log(`snapshot saved for ${pair.address} at ${customTimestamp} `);
    } catch (error) {
      // TODO: Handle errors
    }
  }

  // Checks if the latest snapshot of a pair in the database is more than one hour old.
  private async verifySnapshotIsOlderThan1Hour(pairAddress) {
    try {
      // Find the existing pair in the database.
      const existingPair = await this.pairRepository.findOne({
        where: { address: pairAddress },
      });

      if (existingPair) {
        // If the pair exists, find the latest snapshot for that pair in the database.
        const latestSnapshot = await this.snapshotRepository.findOne({
          where: { pair: existingPair },
          order: { timestamp: 'DESC' },
        });

        if (latestSnapshot) {
          // If the latest snapshot exists, check if its timestamp is more than one hour old.
          const oneHourAgo = new Date();
          oneHourAgo.setHours(oneHourAgo.getHours() - 1);

          return {
            success: true,
            result: latestSnapshot.timestamp < oneHourAgo,
          };
        }
      } else {
        throw new Error();
      }

      // If the pair or latest snapshot does not exist, return a false result.
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  private async createPair(pair: IPair, address: string): Promise<Pair> {
    const { token0, token1 } = pair;
    try {
      const newPair = await this.pairRepository.create({
        address,
        token0,
        token1,
      });

      return await this.pairRepository.save(newPair);
    } catch (error) {
      // TODO: Add error handling here
      console.log(error);
    }
  }

  private generateTimestamp(hourData: number) {
    // The graph returns the data without timestamp, so we need to generate it
    const now = new Date();
    const timestamp = new Date(now.getTime() - hourData * 60 * 60 * 1000);
    return timestamp;
  }

  async findAll() {}
}
