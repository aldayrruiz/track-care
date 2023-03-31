import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type SmartwatchDocument = HydratedDocument<Smartwatch>;

@Schema()
export class Smartwatch {
	@Prop({ required: true })
	MACAdress: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
	owner: User;

	@Prop({ default: Date.now })
	createdAt: Date;
}

export const SmartwatchSchema = SchemaFactory.createForClass(Smartwatch);
