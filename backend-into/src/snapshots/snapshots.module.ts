import { Module } from '@nestjs/common';
import { SnapshotsService } from './snapshots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnapshotPairData } from './entities/snapshot.entity';
import { GraphQLClientService } from 'src/graphql-client/graphql-client.service';
import { Pair } from './entities/pair.entity';
import { SnapshotResolver } from './snapshots.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SnapshotPairData, Pair])],
  providers: [SnapshotsService, SnapshotResolver, GraphQLClientService],
})
export class SnapshotsModule {}
