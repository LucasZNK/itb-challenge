import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { SnapshotPairData } from './snapshot.entity';

@ObjectType()
class Token {
  @Field(() => String)
  name: string;

  @Field(() => String)
  symbol: string;
}

// pair.entity.ts

@ObjectType()
@Entity()
export class Pair {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  @Index()
  address: string;

  @Column()
  @Field(() => Token)
  token0: Token;

  @Column()
  @Field(() => Token)
  token1: Token;

  @OneToMany(
    () => SnapshotPairData,
    (snapshotPairData) => snapshotPairData.pair,
  )
  @Field(() => [SnapshotPairData])
  snapshotPairData: SnapshotPairData[];
}
