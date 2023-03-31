/* eslint-disable @typescript-eslint/no-unused-vars */

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { EmailOrPasswordIncorrect } from '../errors/email-or-pass-incorrect.error';
import { HashingService } from './hashing.service';

@Injectable()
export class AuthService {
	constructor(
		private hashingService: HashingService,
		private configService: ConfigService,
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	/**
	 * Create a user and returns access and refresh token.
	 *
	 * @param signUpDto
	 * @returns
	 */
	async signUp(signUpDto: SignUpDto) {
		// Check if user exists
		const userExists = await this.usersService.findByEmail(signUpDto.email);
		if (userExists) {
			throw new Error('User already exists');
		}

		// Hash password
		const hash = await this.hashingService.hash(signUpDto.password);
		const user = await this.usersService.create({ ...signUpDto, password: hash });

		// Generate JWT tokens
		const tokens = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);
		return tokens;
	}

	async signIn(signInDto: SignInDto) {
		const user = await this.validateUser(signInDto.email, signInDto.password);
		if (!user) {
			throw new EmailOrPasswordIncorrect();
		}
		const tokens = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);
		return tokens;
	}

	async logout(userId: string) {
		return this.usersService.update(userId, { refreshToken: null });
	}

	async validateUser(email: string, password: string): Promise<UserDocument | null> {
		const user = await this.usersService.findByEmail(email);

		if (!user) {
			throw new EmailOrPasswordIncorrect();
		}

		if (this.hashingService.verify(password, user.password)) {
			return user;
		}
		return null;
	}

	/**
	 * Updates refresh token given a userId and the refresh token.
	 *
	 * @param userId User id
	 * @param refreshToken Refresh token
	 */
	async updateRefreshToken(userId: string, refreshToken: string) {
		const hashedRefreshToken = await this.hashingService.hash(refreshToken);
		await this.usersService.update(userId, { refreshToken: hashedRefreshToken });
	}

	/**
	 * Given userId and email, access and refresh token are returned.
	 *
	 * @param userId User id
	 * @param email User email
	 * @returns access and refresh token
	 */
	async getTokens(userId: string, email: string) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{
					sub: userId,
					email,
				},
				{
					secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
					expiresIn: '15m',
				}
			),
			this.jwtService.signAsync(
				{
					sub: userId,
					email,
				},
				{
					secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
					expiresIn: '7d',
				}
			),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}

	async refreshTokens(userId: string, refreshToken: string) {
		// Check if user & user refresh token exists
		const user = await this.usersService.findById(userId);
		if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

		// Verify refresh token passed & refresh token stored match
		const refreshTokenMatches = this.hashingService.verify(user.refreshToken, refreshToken);
		if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

		// Generate & return new tokens
		const tokens = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);
		return tokens;
	}
}
