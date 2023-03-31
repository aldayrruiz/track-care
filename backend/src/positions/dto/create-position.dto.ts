import { IsDateString, IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { SourcePosition } from './source.dto';
import { PositionType } from './type.dto';

export class CreatePositionDto {
	@IsEnum(PositionType)
	type: PositionType;

	@IsNumber()
	latitude: number;

	@IsNumber()
	longitude: number;

	@IsNumber()
	altitude: number;

	@IsNumber()
	accuracy: number;

	@IsEnum(SourcePosition)
	source: SourcePosition;

	@IsNumber()
	battery: number;

	@IsDateString()
	timestamp: string;

	@IsMongoId()
	owner: string;
}
