import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
} from 'class-validator';

@InputType()
export class PairSnapshotFilterDto {
  @IsString()
  @Field()
  pairAddress: string;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  startDate?: string;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  endDate?: string;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  lastSnapshotsFromNow?: number;
}
