import {
	IsBoolean,
	IsEmail,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsStrongPassword,
} from 'class-validator';
import { UserRole } from './role.dto';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	email: string;

	@IsStrongPassword()
	password: string;

	@IsString()
	refreshToken: string;

	@IsOptional()
	@IsBoolean()
	emailReceiver: boolean;

	@IsOptional()
	@IsMongoId()
	smartwatch?: string;

	@IsEnum(UserRole)
	role?: UserRole;
}
