import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	create(@Body() createAuthDto: CreateAuthDto) {
		return this.authService.create(createAuthDto);
	}

	@Get('login')
	findAll() {
		return this.authService.findAll();
	}
}
