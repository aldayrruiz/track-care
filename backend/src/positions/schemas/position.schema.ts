import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type PositionDocument = HydratedDocument<Position>;

@Schema()
export class Position {
	@Prop({ required: true })
	type: string;

	@Prop({ required: true })
	latitude: number;

	@Prop({ required: true })
	longitude: number;

	@Prop({ required: true })
	altitude: number;

	@Prop({ required: true })
	accuracy: number;

	@Prop({ required: true })
	source: string;

	@Prop({ required: true })
	battery: number;

	@Prop({ required: true })
	timestamp: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	owner: User;
}

export const PositionSchema = SchemaFactory.createForClass(Position);
