import { ApiHideProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsStrongPassword,
} from 'class-validator';
import { UserRole } from 'src/users/dto/role.dto';

export class SignUpDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	email: string;

	@IsStrongPassword()
	password: string;

	@IsEnum(UserRole)
	@IsOptional()
	role?: UserRole;

	@ApiHideProperty()
	readonly refreshToken?: string;
}
