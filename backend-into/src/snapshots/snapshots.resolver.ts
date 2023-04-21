import { Query, Resolver } from '@nestjs/graphql';
import { SnapshotsService } from './snapshots.service';
import { SnapshotPairData } from './entities/snapshot.entity';

@Resolver()
export class SnapshotsResolver {
  constructor(private snapshotService: SnapshotsService) {}

  @Query((returns) => [SnapshotPairData])
  getPairInfo(): Promise<SnapshotPairData[]> {
    return this.snapshotService.findAll();
  }
}
