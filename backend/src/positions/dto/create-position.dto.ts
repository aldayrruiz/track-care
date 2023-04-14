import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
	IsDateString,
	IsEnum,
	IsLatitude,
	IsLongitude,
	IsMACAddress,
	IsNotEmpty,
	IsNumber,
} from 'class-validator';
import { SourcePosition } from './source.dto';
import { PositionType } from './type.dto';

export class CreatePositionDto {
	@IsEnum(PositionType)
	type: PositionType;

	@IsNotEmpty()
	@IsMACAddress()
	MAC: string;

	@IsNumber()
	@IsLatitude()
	latitude: number;

	@IsNumber()
	@IsLongitude()
	longitude: number;

	@IsNumber()
	altitude: number;

	@IsNumber()
	accuracy: number;

	@IsNumber()
	battery: number;

	@IsEnum(SourcePosition)
	source: SourcePosition;

	@IsDateString()
	deviceTimestamp: string;

	@Exclude()
	@ApiHideProperty()
	serverTimestamp: string;
}
