import { Module } from '@nestjs/common';
import { SnapshotsService } from './snapshots.service';
import { SnapshotsResolver } from './snapshots.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnapshotPairData } from './entities/snapshot.entity';
import { GraphQLClientService } from 'src/graphql-client/graphql-client.service';
import { Pair } from './entities/pair.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SnapshotPairData, Pair])],
  providers: [SnapshotsService, SnapshotsResolver, GraphQLClientService],
})
export class SnapshotsModule {}
