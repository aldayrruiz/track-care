import { Exclude, Expose, Transform } from 'class-transformer';

export class UserResponse {
	@Transform((value) => String(value.obj._id))
	@Expose({ name: 'id' })
	_id: string;

	@Exclude()
	password: string;

	@Exclude()
	refreshToken: string;

	@Transform((value) => String(value.obj.smartwatch))
	smartwatch: string;

	constructor(partial: Partial<UserResponse>) {
		Object.assign(this, partial);
	}
}
