// snapshot-pair-data.entity.ts
import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Pair } from './pair.entity';

@ObjectType()
@Entity()
export class SnapshotPairData {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @ManyToOne(() => Pair, (pair) => pair.snapshotPairData, { eager: true })
  @Field(() => Pair)
  pair: Pair;

  @Column({ type: 'float' })
  @Field(() => Number)
  hourlyVolumeToken0: number;

  @Column({ type: 'float' })
  @Field(() => Number)
  hourlyVolumeToken1: number;

  @Column({ type: 'float' })
  @Field(() => Number)
  hourlyVolumeUSD: number;

  @Column({ type: 'float' })
  @Field(() => Number)
  reserve0: number;

  @Column({ type: 'float' })
  @Field(() => Number)
  reserve1: number;

  @Column({ type: 'float' })
  @Field(() => Number)
  reserveUSD: number;

  @Column({ type: 'timestamptz' })
  @Field(() => Date)
  @Index()
  timestamp: Date;

  @Column({ type: 'float' })
  @Field(() => Number)
  hourlyPairFees: number;
}
