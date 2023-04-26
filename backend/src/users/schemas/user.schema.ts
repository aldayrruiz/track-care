import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Smartwatch } from 'src/smartwatches/schemas/smartwatch.schema';
import { UserRole } from '../dto/role.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({ required: true })
	name: string;

	@Prop({ unique: true, required: true })
	email: string;

	@Prop({ required: false })
	password?: string;

	@Prop()
	refreshToken: string;

	@Prop({ enum: UserRole, default: UserRole.USER })
	role?: UserRole;

	@Prop({ default: false })
	emailReceiver: boolean;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Smartwatch',
		unique: false,
		required: false,
		default: null,
	})
	smartwatch: Smartwatch;

	@Prop({ default: new Date().toJSON() })
	createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
