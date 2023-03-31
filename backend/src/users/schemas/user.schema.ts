import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from '../dto/role.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({ required: true })
	name: string;

	@Prop({ unique: true, required: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop()
	refreshToken: string;

	@Prop({ enum: UserRole, default: UserRole })
	role?: UserRole;

	@Prop({ default: Date.now })
	createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
