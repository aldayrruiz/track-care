import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: 'email' });
	}

	// Here validate functions expect username & password, but username is email.
	async validate(username: string, password: string): Promise<any> {
		console.log('LocalStrategy');
		const user = await this.authService.validateUser(username, password);
		if (!user) {
			throw new UnauthorizedException();
		}
		const tokens = await this.authService.getTokens(user._id.toHexString(), user.email);
		await this.authService.updateRefreshToken(user._id.toHexString(), tokens.refreshToken);
		return { ...user, ...tokens };
	}
}
