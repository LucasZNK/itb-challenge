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

        let pair = await this.getPairInfo(address);

        if (!pair) {
          // Fetch for last 48hs of data
          const response: IPairHourDatasResponse = await this.fetchPairData(
            query,
            48,
          );

          if (response) {
            pair = await this.createPair(
              response.pairHourDatas[0].pair,
              address,
            );

            await this.saveSnapshotsFrom48hs(response.pairHourDatas, pair);

            return;
          } else {
            console.log('Error fetching data');
          }
        }

        let latestSnapshot = await this.getLatestSnapshot(pair.id);
        const difference = this.getTimeDifference(latestSnapshot.timestamp);

        // If snapshot is not up to date, but less than 2hours of difference, we fetch the last  2 hour of data
        if (
          difference.differenceInHours >= 1 &&
          difference.differenceInHours < 2
        ) {
          // If difference btw last snapshot and now is more than 1 hour but less than 2, we fetch the last 2 hours of data
          const data = await this.fetchPairData(query, 2);
          await this.saveSnapshot( pair , data);
        }

        // If snapshot is not up to date but more than 2 hours of diff, we fetch for last 48hs hours.
        if (difference.differenceInHours >= 2) {
          // This feature is to avoid the case when the cron job is not executed for some reason
          // and the snapshots are not updated for less than 48hs.
          // If the difference is more than 48hs, we fetch the last 48hs of data
          try {
            const data = await this.fetchPairData(query, 48);
            await this.saveSnapshotsFrom48hs(data.pairHourDatas, pair);
          } catch (error) {
            console.log(`Error fetching data in difference >= 2: ${error}`);
          }
        }

        console.log(
          `Snapshot for pair ${pair.address} is up to date, saved at ${
            latestSnapshot.timestamp
          }. Current time: ${
            difference.currentTimestamp
          }. Next update will be at: ${
            difference.nextUpdateTime
          }. Remaining time for next update: ${
            60 - difference.remainingMinutes
          } minutes.`,
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  private getTimeDifference(latestSnapshotTimestamp: Date) {
    const now = new Date();
    const differenceInMillis =
      now.getTime() - latestSnapshotTimestamp.getTime();
    const differenceInMinutes = Math.floor(differenceInMillis / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const remainingMinutes = differenceInMinutes % 60;
    const nextUpdateTime = new Date(
      now.getTime() + (60 - remainingMinutes) * 60 * 1000,
    );

    return {
      differenceInMinutes,
      differenceInHours,
      remainingMinutes,
      currentTimestamp: now,
      latestSnapshotTimestamp,
      nextUpdateTime,
    };
  }

  private async fetchPairData(
    query: DocumentNode,
    fromHoursAgo: number,
  ): Promise<any> {
    const params: Variables = {
      fromHoursAgo: fromHoursAgo,
    };

    const data = await this.graphqlExternalClient.request(query, params);
    return data;
  }

  private async getPairInfo(address: string): Promise<Pair> {
    // return pair if is present or null if not

    try {
      let pair = await this.pairRepository.findOne({
        where: { address: address },
      });

      if (!pair) {
        return;
      }
      return pair;
    } catch (error) {
      console.log(error);
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async getPairsInforLastHour() {
    try {
      initialPairs.forEach(async (address) => {
        const pair = await this.getPairInfo(address);
  

        const query = await this.graphqlClientService.buildPairDataQuery(
          pairInfoQuery,
          address,
        );
  
        const data: IPairHourDatasResponse = await this.fetchPairData(query, 1);
        console.log(data)
        this.saveSnapshot(pair, data.pairHourDatas[0] );
      
        // const a = await this.saveSnapshot(data, pair);
     
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  
  async getLatestSnapshot(pairId: number): Promise<SnapshotPairData> {
    try {
      const latestSnapshot = await this.snapshotRepository.findOne({
        where: { pair: { id: pairId } },
        order: { timestamp: 'DESC' },
      });
      return latestSnapshot;
    } catch (error) {
      console.log(error);
    }
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

    console.log('Finished ');

    return { success: true, error: null };
  }

  private async saveSnapshot(
    pair: Pair,
    pairHourData:IPairHourData,
    customTimestamp = new Date(),
  ) {

  
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

     console.log(newSnapshotPairData)

      const  snapshot = await this.snapshotRepository.save(newSnapshotPairData);
      console.log(
        `snapshot saved for ${pair.address} at ${customTimestamp}  with id ${snapshot.id}`,
      );
     } catch (error) {
      console.log(error)
      // TODO: Handle errors
    }
  }

  private verifySnapshotIsOlderThan1Hour(latestSnapshotTimestamp: Date) {
    try {
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);

      return latestSnapshotTimestamp < oneHourAgo;
    } catch (error) {
      console.log(error);
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
