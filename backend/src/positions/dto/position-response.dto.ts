import { Expose, Transform } from 'class-transformer';
import { SourcePosition } from './source.dto';

export class PositionResponse {
	@Transform((value) => String(value.obj._id))
	@Expose({ name: 'id' })
	_id: string;

	MAC: string;
	latitude: number;
	longitude: number;
	altitude: number;
	accuracy: number;
	battery: number;
	source: SourcePosition;
	deviceTimestamp: string;
	serverTimestamp: string;

	@Transform((value) => String(value.obj.smartwatch))
	smartwatch: string;

	@Transform((value) => String(value.obj.user))
	user: string;

	constructor(partial: Partial<PositionResponse>) {
		Object.assign(this, partial);
	}
}
