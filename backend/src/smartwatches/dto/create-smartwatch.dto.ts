import { IsMACAddress } from 'class-validator';

export class CreateSmartwatchDto {
	@IsMACAddress({ no_colons: false })
	MAC: string;
}
