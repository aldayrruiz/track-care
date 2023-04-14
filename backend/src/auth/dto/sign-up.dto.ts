import { ApiHideProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsEmail,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsOptional,
	IsString,
} from 'class-validator';
import { UserRole } from 'src/users/dto/role.dto';

export class SignUpDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	email: string;

	@IsOptional()
	@ApiHideProperty()
	password: string;

	@IsEnum(UserRole)
	@IsOptional()
	role?: UserRole;

	@IsOptional()
	@IsBoolean()
	emailReceiver: boolean;

	@IsOptional()
	@IsMongoId()
	smartwatch?: string;

	@ApiHideProperty()
	readonly refreshToken?: string;
}
