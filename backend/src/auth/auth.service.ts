/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { HashingService } from './hashing.service';

@Injectable()
export class AuthService {
	constructor(private userService: UsersService, private hashingService: HashingService) {}

	async register(registerDto: RegisterDto) {
		const hashedPassword = await this.hashingService.hashPassword(registerDto.password);
		const user = await this.userService.create({ ...registerDto, password: hashedPassword });
		return user;
	}

	login() {
		return 'login';
	}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.userService.findByEmail(email);
		if (this.hashingService.comparePassword(pass, user.password)) {
			return user;
		}
		return null;
	}
}
