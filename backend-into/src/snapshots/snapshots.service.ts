import { Injectable } from '@nestjs/common';
import { SnapshotPairData } from './entities/snapshot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pair } from './entities/pair.entity';

@Injectable()
export class SnapshotsService {
  constructor(
    @InjectRepository(SnapshotPairData)
    private snapshotRepository: Repository<SnapshotPairData>,
    private pairRepository: Repository<Pair>,
    private snapshotPairDataRepository: Repository<SnapshotPairData>,
  ) {}

  async findAll(): Promise<SnapshotPairData[]> {
    return await this.snapshotRepository.find();
  }

  async savePairHourData(data: SnapshotPairData[]) {
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

      await this.snapshotPairDataRepository.save(snapshot);
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
    const date = await this.generateTimestamp(index);
    snapshot.timestamp = date;

    return snapshot;
  }

  async generateTimestamp(hourData: number) {
    // The graph returns the data without timestamp, so we need to generate it
    const now = new Date();
    const timestamp = new Date(now.getTime() - hourData * 60 * 60 * 1000);
    return timestamp;
  }
}
