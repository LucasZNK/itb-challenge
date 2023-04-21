// pair.entity.ts
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SnapshotPairData } from './snapshot.entity';

@ObjectType()
@Entity()
class Pair {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => Token)
  token0: Token;

  @Column()
  @Field(() => Token)
  token1: Token;
}
