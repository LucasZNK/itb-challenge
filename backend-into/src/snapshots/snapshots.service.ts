import { Injectable } from '@nestjs/common';
import { SnapshotPairData } from './entities/snapshot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class SnapshotsService {
  constructor(
    @InjectRepository(SnapshotPairData)
    private snapshotRepository: Repository<SnapshotPairData>,
  ) {}

  async findAll(): Promise<SnapshotPairData[]> {
    return await this.snapshotRepository.find();
  }
}
