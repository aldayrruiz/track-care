import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
	async hash(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	}

	async verify(password: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(password, hash);
	}
}
