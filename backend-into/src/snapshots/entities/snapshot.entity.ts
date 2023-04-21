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

  @ManyToOne(() => Pair, (pair) => pair.snapshotPairData)
  @Field(() => Pair)
  pair: Pair;

  @Column()
  @Field(() => String)
  hourlyVolumeToken0: string;

  @Column()
  @Field(() => String)
  hourlyVolumeToken1: string;

  @Column()
  @Field(() => String)
  hourlyVolumeUSD: string;

  @Column()
  @Field(() => String)
  reserve0: string;

  @Column()
  @Field(() => String)
  reserve1: string;

  @Column()
  @Field(() => String)
  reserveUSD: string;

  @Column({ type: 'timestamptz' })
  @Field(() => Date)
  @Index()
  timestamp: Date;
}
