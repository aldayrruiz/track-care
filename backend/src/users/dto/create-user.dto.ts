import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
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

	@IsEnum(UserRole)
	role?: UserRole;
}
