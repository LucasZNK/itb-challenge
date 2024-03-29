import { Resolver, Query, Args } from '@nestjs/graphql';
import { SnapshotsService } from './snapshots.service';

import { SnapshotPairData } from './entities/snapshot.entity';
import { PairSnapshotFilterDto } from './dtos/snapshot-info.dto';

@Resolver(() => SnapshotPairData)
export class SnapshotResolver {
  constructor(private readonly snapshotsService: SnapshotsService) {}

  @Query(() => [SnapshotPairData], { nullable: 'items' })
  async getPairSnapshotsByDateRange(
    @Args('pairSnapshotFilter', { type: () => PairSnapshotFilterDto })
    pairSnapshotFilter: PairSnapshotFilterDto,
  ): Promise<SnapshotPairData[]> {
    const { pairAddress, startDate, endDate, lastSnapshotsFromNow } =
      pairSnapshotFilter;
    const snaps = await this.snapshotsService.findPairSnapshotsByDateRange(
      pairAddress,
      startDate,
      endDate,
      lastSnapshotsFromNow,
    );
    return snaps;
  }
}
