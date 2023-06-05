import { IsAlphanumeric, IsString } from 'class-validator';

export class CreateSmartwatchDto {
	@IsString()
	@IsAlphanumeric()
	androidId: string;
}
