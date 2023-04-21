import { Module } from '@nestjs/common';
import { SnapshotsService } from './snapshots.service';
import { SnapshotsResolver } from './snapshots.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnapshotPairData } from './entities/snapshot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SnapshotPairData])],
  providers: [SnapshotsService, SnapshotsResolver],
})
export class SnapshotsModule {}
