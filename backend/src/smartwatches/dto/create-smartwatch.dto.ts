import { IsMACAddress, IsMongoId } from 'class-validator';

export class CreateSmartwatchDto {
	@IsMongoId()
	owner: string;

	@IsMACAddress()
	MACAddress: string;
}
