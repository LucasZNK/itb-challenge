import { Injectable, OnModuleInit } from '@nestjs/common';
import { SnapshotPairData } from './entities/snapshot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Pair } from './entities/pair.entity';
import { GraphQLClientService } from 'src/graphql-client/graphql-client.service';
import { GraphQLClient } from 'graphql-request';
import { pairInfoQuery } from 'src/graphql-client/queries';
import { buildPairDataQuery } from 'src/graphql-client/utils';
@Injectable()
export class SnapshotsService implements OnModuleInit {
  graphqlExternalClient: GraphQLClient;

  constructor(
    @InjectRepository(SnapshotPairData)
    private snapshotRepository: Repository<SnapshotPairData>,
    @InjectRepository(Pair)
    private pairRepository: Repository<Pair>,
    private graphqlClientService: GraphQLClientService,
  ) {
    this.graphqlExternalClient = this.graphqlClientService.getClient();
  }

  async onModuleInit() {
    console.log('Snapshots service initialized');

    const data = await this.fetchPairData(
      '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
      1,
    );
    console.log(data);
  }

  async getPairDataFromDb(pairAddress: string, fromHoursAgo: number) {
    const pairExists = await this.pairRepository.findOne({
      where: { address: pairAddress },
    });

    if (pairExists) {
      let snapshotOnTime = await this.snapshotRepository.find({
        where: {
          pair: pairExists,
          timestamp: MoreThan(this.generateTimestamp(1)),
        },
      });
      if (snapshotOnTime) {
        return snapshotOnTime;
      } else {
        // fetch for new data and save on the database
      }
    }
    // fetch for 48 hours of data and save on the database
  }

  async fetchPairData(addressPair: string, fromHoursAgo: number) {
    const params = {
      addressPair: addressPair,
      fromHoursAgo: fromHoursAgo,
    };

    const query = this.graphqlClientService.buildPairDataQuery(
      pairInfoQuery,
      addressPair,
    );

    const data = await this.graphqlExternalClient.request(query, params);
    return data;
  }

  async findAll(): Promise<SnapshotPairData[]> {
    return await this.snapshotRepository.find();
  }

  // async getHourlyData(): Promise<SnapshotPairData[]> {
  //   // validate if the data is already saved and is older than 1 hour
  //   // if it is, return the existing database data
  // }

  async savePairHourData(data: SnapshotPairData[]) {
    // Save the pair data
    // If the pair doesn't exist, create it on db
    // If the pair exists, update the data
    const pairHourDatas = data;

    for (let index = 0; index < pairHourDatas.length; index++) {
      const pairHourData = pairHourDatas[index];

      let pair = await this.pairRepository.findOne({
        where: {
          address: pairHourData.pair.address,
        },
      });

      if (!pair) {
        pair = new Pair();
        pair.token0.name = pairHourData.pair.token0.name;
        pair.token1.name = pairHourData.pair.token1.name;
        pair.address = pairHourData.pair.address;
        await this.pairRepository.save(pair);
      }

      const snapshot = await this.createSnapshot(pairHourData, pair, index);

      await this.snapshotRepository.save(snapshot);
    }
  }

  async createSnapshot(
    pairHourData: SnapshotPairData,
    pair: Pair,
    index: number,
  ) {
    const snapshot = new SnapshotPairData();
    snapshot.pair = pair;
    snapshot.hourlyVolumeToken0 = pairHourData.hourlyVolumeToken0;
    snapshot.hourlyVolumeToken1 = pairHourData.hourlyVolumeToken1;
    snapshot.hourlyVolumeUSD = pairHourData.hourlyVolumeUSD;
    snapshot.reserve0 = pairHourData.reserve0;
    snapshot.reserve1 = pairHourData.reserve1;
    snapshot.reserveUSD = pairHourData.reserveUSD;
    const date = this.generateTimestamp(index);
    snapshot.timestamp = date;

    return snapshot;
  }

  generateTimestamp(hourData: number) {
    // The graph returns the data without timestamp, so we need to generate it
    const now = new Date();
    const timestamp = new Date(now.getTime() - hourData * 60 * 60 * 1000);
    return timestamp;
  }
}
