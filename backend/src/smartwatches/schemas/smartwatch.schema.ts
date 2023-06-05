import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SmartwatchDocument = HydratedDocument<Smartwatch>;

@Schema()
export class Smartwatch {
	@Prop({ required: true, unique: true })
	androidId: string;

	@Prop({ default: new Date().toJSON() })
	createdAt: Date;
}

export const SmartwatchSchema = SchemaFactory.createForClass(Smartwatch);
