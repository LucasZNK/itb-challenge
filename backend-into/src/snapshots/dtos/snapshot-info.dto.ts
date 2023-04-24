import { Field, InputType } from "@nestjs/graphql";
import {IsNotEmpty, IsString, IsOptional, IsDateString} from "class-validator"
@InputType()
export class PairSnapshotFilterDto {

    @IsString()
    @Field()
    pairAddress: string;
  
    @IsOptional()
    @IsDateString()
    @Field()
    startDate?: string;
  
    @IsOptional()
    @IsDateString()
    @Field()
    endDate?: string;
     
}