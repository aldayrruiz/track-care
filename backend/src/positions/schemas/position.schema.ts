import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Smartwatch } from 'src/smartwatches/schemas/smartwatch.schema';
import { User } from 'src/users/schemas/user.schema';
import { SourcePosition } from '../dto/source.dto';

export type PositionDocument = HydratedDocument<Position>;

@Schema()
export class Position {
	@Prop({ required: true })
	type: string;

	@Prop({ required: true })
	MAC: string;

	@Prop({ required: true })
	latitude: number;

	@Prop({ required: true })
	longitude: number;

	@Prop({ required: true })
	altitude: number;

	@Prop({ required: true })
	accuracy: number;

	@Prop({ required: true })
	battery: number;

	@Prop({ required: true, enum: SourcePosition })
	source: SourcePosition;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	user: User;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Smartwatch' })
	smartwatch: Smartwatch;

	@Prop({ required: true })
	deviceTimestamp: string;

	@Prop({ default: new Date().toJSON() })
	serverTimestamp: string;
}

export const PositionSchema = SchemaFactory.createForClass(Position);
