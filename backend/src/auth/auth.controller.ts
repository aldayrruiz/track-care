import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SkipAuth } from './constants';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthService } from './services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@SkipAuth()
	@Post('signUp')
	signUp(@Body() signUpDto: SignUpDto) {
		console.log(signUpDto);
		return this.authService.signUp(signUpDto);
	}

	@SkipAuth()
	@Post('signIn')
	signIn(@Body() data: SignInDto) {
		return this.authService.signIn(data);
	}

	@Get('logOut')
	logout(@Req() req: Request) {
		this.authService.logout(req.user['sub']);
	}

	@SkipAuth()
	@UseGuards(JwtRefreshGuard)
	@Get('refresh')
	refreshTokens(@Req() req: Request) {
		const userId = req.user['sub'];
		const refreshToken = req.user['refreshToken'];
		return this.authService.refreshTokens(userId, refreshToken);
	}
}
