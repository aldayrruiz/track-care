import { Expose, Transform } from 'class-transformer';

export class SmartwatchResponse {
	@Transform((value) => String(value.obj._id))
	@Expose({ name: 'id' })
	_id: string;

	MAC: string;

	constructor(partial: Partial<SmartwatchResponse>) {
		Object.assign(this, partial);
	}
}
