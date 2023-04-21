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
  ) {}

  async findAll(): Promise<SnapshotPairData[]> {
    return await this.snapshotRepository.find();
  }

  async savePairHourData(data) {
    const pairHourDatas = data.data.pairHourDatas;

    for (const pairHourData of pairHourDatas) {
      const pair = await this.pairRepository.findOne({
        where: {
          address: pairHourData.address,
        },
      });

      //   // Si el par no existe, crea un nuevo registro en la tabla `pair`
      //   if (!pair) {
      //     pair = new Pair();
      //     pair.token0_name = pairHourData.pair.token0.name;
      //     pair.token1_name = pairHourData.pair.token1.name;
      //     pair.pair_address = pairAddress;
      //     await pairRepository.save(pair);
      //   }

      //   // Crear un nuevo registro en la tabla `snapshot_pair_data`
      //   const snapshot = new SnapshotPairData();
      //   snapshot.pair = pair;
      //   snapshot.hourlyVolumeToken0 = pairHourData.hourlyVolumeToken0;
      //   snapshot.hourlyVolumeToken1 = pairHourData.hourlyVolumeToken1;
      //   snapshot.hourlyVolumeUSD = pairHourData.hourlyVolumeUSD;
      //   snapshot.reserve0 = pairHourData.reserve0;
      //   snapshot.reserve1 = pairHourData.reserve1;
      //   snapshot.reserveUSD = pairHourData.reserveUSD;

      //   // Calcular la hora y guardarla en el registro
      //   const now = new Date();
      //   snapshot.timestamp = new Date(
      //     now.getTime() -
      //       (2 - pairHourDatas.indexOf(pairHourData)) * 60 * 60 * 1000,
      //   );

      //   await snapshotPairDataRepository.save(snapshot);
    }
  }
}
