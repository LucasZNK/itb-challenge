import { Test, TestingModule } from '@nestjs/testing';
import { SnapshotsResolver } from './snapshots.resolver';

describe('SnapshotsResolver', () => {
  let resolver: SnapshotsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnapshotsResolver],
    }).compile();

    resolver = module.get<SnapshotsResolver>(SnapshotsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
