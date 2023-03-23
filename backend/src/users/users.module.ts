import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const UserMongoose = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]);

@Module({
	imports: [UserMongoose],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
